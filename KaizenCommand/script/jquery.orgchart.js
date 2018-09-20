(function($) {
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);        
    }

    $.fn.orgChart.defaults = {
        data: [{ id: 1, name: 'Root', classifier: 'r', prioritizing: 'r', parent: 0}],
        showControls: false,
        allowEdit: false,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: 'Причина'
    };

    function OrgChart($container, opts){
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function(){
            $container.empty().append(rootNodes[0].render(opts));
            $container.find('.node').click(function(){
                if(self.opts.onClickNode !== null){
                    self.opts.onClickNode(nodes[$(this).attr('node-id')]);
                }
            });

            if(opts.allowEdit){
                $container.find('.node h2').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId, 'h2');
                    e.stopPropagation();
                });
                $container.find('.node h3').click(function (e) {
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId, 'h3');
                    e.stopPropagation();
                });
                $container.find('.node h4').click(function (e) {
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId, 'h4');
                    e.stopPropagation();
                });
            }

            // add "add button" listener
            $container.find('.org-add-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onAddNode !== null){
                    self.opts.onAddNode(nodes[thisId]);
                }
                else{
                    self.newNode(thisId);
                }
                e.stopPropagation();
            });

            $container.find('.org-del-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onDeleteNode !== null){
                    self.opts.onDeleteNode(nodes[thisId]);
                }
                else{
                    self.deleteNode(thisId);
                }
                e.stopPropagation();
            });
        }

        this.startEdit = function (id, element) {

            if (element == 'h2') {

                var inputElement = $('<input class="org-input" type="text" value="' + nodes[id].data.name + '"/>');

                $container.find('div[node-id=' + id + '] h2').replaceWith(inputElement);

                var commitChange = function () {
                    var h2Element = $('<h2>' + nodes[id].data.name + '</h2>');

                    if (opts.allowEdit) {
                        h2Element.click(function () {
                            self.startEdit(id, 'h2');
                        })

                    }
                    inputElement.replaceWith(h2Element);

                }  

                inputElement.focus();
                inputElement.keyup(function (event) {
                    if (event.which == 13) {
                        commitChange();
                    }
                    else {
                        nodes[id].data.name = inputElement.val();
                    }
                });
                inputElement.blur(function (event) {
                    commitChange();
                });
            }
            if (element == 'h3') {

                var inputElement1 = $('<select class="org-input"><option>Организационная</option><option>Техническая</option></select>');
                $container.find('div[node-id=' + id + '] h3').replaceWith(inputElement1);

                var commitChange1 = function () {

                    var h3Element = $('<h3>' + nodes[id].data.classifier + '</h3>');

                    if (opts.allowEdit) {

                        h3Element.click(function () {
                            self.startEdit(id, 'h3');
                        })

                    }

                    inputElement1.replaceWith(h3Element);

                }  

                inputElement1.focus();
                inputElement1.on('change', function () {
                    nodes[id].data.classifier = inputElement1.val();
                });
                inputElement1.blur(function (event) {
                    nodes[id].data.classifier = inputElement1.val();
                    commitChange1();
                });
            }

            if (element == 'h4') {

                var inputElement2 = $('<input class="org-input" type="text" value="' + nodes[id].data.prioritizing + '"/>');

                $container.find('div[node-id=' + id + '] h4').replaceWith(inputElement2);

                var commitChange2 = function () {
                    var h4Element = $('<h4>' + nodes[id].data.prioritizing + '</h4>');
                    if (opts.allowEdit) {

                        h4Element.click(function () {
                            self.startEdit(id, 'h4');
                        })
                    }

                    inputElement2.replaceWith(h4Element);
                }

                inputElement2.focus();
                inputElement2.keyup(function (event) {
                    if (event.which == 13) {
                        commitChange2();
                    }
                    else {

                        nodes[id].data.prioritizing = inputElement2.val();
                    }
                });
                inputElement2.blur(function (event) {
                    commitChange2();
                });
            }
                       
           
            
        }

        this.newNode = function(parentId){
            var nextId = Object.keys(nodes).length;
            while(nextId in nodes){
                nextId++;
            }

            self.addNode({ id: nextId, name: '', classifier: '', prioritizing: '', parent: parentId});
        }

        this.addNode = function(data){
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);

            self.draw();
            self.startEdit(data.id, 'h2');
        }

        this.deleteNode = function(id){
            for(var i=0;i<nodes[id].children.length;i++){
                self.deleteNode(nodes[id].children[i].data.id);
            }
            nodes[nodes[id].data.parent].removeChild(id);
            delete nodes[id];
            self.draw();
        }

        this.getData = function(){
            var outData = [];
            for(var i in nodes){
                outData.push(nodes[i].data);
            }
            return outData;
        }

        // constructor
        for(var i in data){
            var node = new Node(data[i]);
            nodes[data[i].id] = node;
        }

        // generate parent child tree
        for(var i in nodes){
            if(nodes[i].data.parent == 0){
                rootNodes.push(nodes[i]);
            }
            else{
                nodes[nodes[i].data.parent].addChild(nodes[i]);
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data){
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode){
            this.children.push(childNode);
        }

        this.removeChild = function(id){
            for(var i=0;i<self.children.length;i++){
                if(self.children[i].data.id == id){
                    self.children.splice(i,1);
                    return;
                }
            }
        }

        this.render = function(opts){
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
            var nodeColspan = childLength>0?2*childLength:2;
            mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

            if(childLength > 0){
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

                var linesCols = '';
                for(var i=0;i<childLength;i++){
                    if(childLength==1){
                        linesCols += "<td class='line left half'></td>";    // keep vertical lines aligned if there's only 1 child
                    }
                    else if(i==0){
                        linesCols += "<td class='line left'></td>";     // the first cell doesn't have a line in the top
                    }
                    else{
                        linesCols += "<td class='line left top'></td>";
                    }

                    if(childLength==1){
                        linesCols += "<td class='line right half'></td>";
                    }
                    else if(i==childLength-1){
                        linesCols += "<td class='line right'></td>";
                    }
                    else{
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

                mainTable += "<tr>";
                for(var i in self.children){
                    mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts){
            var nameString = '',
                descString = '';
            classifierString = '';
            prioritizingString = '';
            if(typeof data.name !== 'undefined'){
                nameString = '<h2>'+self.data.name+'</h2>';
            }
            if (typeof data.classifier !== 'undefined') {
                classifierString = '<h3>' + self.data.classifier + '</h3>';
            }
            if (typeof data.prioritizing !== 'undefined') {
                prioritizingString = '<h4>' + self.data.prioritizing + '</h4>';
            }
            if(typeof data.description !== 'undefined'){
                descString = '<p>'+self.data.description+'</p>';
            }
            if(opts.showControls){
                var buttonsHtml = "<div class='org-add-button'>"+opts.newNodeText+"</div><div class='org-del-button'></div>";
            }
            else{
                buttonsHtml = '';
            }
            return "<div class='node' node-id='" + this.data.id + "'>" + nameString + classifierString + prioritizingString+descString+buttonsHtml+"</div>";
        }
    }

})(jQuery);

