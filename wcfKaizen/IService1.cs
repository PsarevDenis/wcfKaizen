using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace wcfKaizen
{
    // ПРИМЕЧАНИЕ. Команду "Переименовать" в меню "Рефакторинг" можно использовать для одновременного изменения имени интерфейса "IService1" в коде и файле конфигурации.
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetDepartment")]
        List<Department> GetDepartment();

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetClassifier")]
        List<Classifier> GetClassifier();

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetCommandType")]
        List<KaizenCommandType> GetCommandType();

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetEvent?eventId={eventId}")]
        KaizenEvent GetEvent(int eventId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetGoals?goalId={goalId}")]
        KaizenGoals GetGoals(int goalId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetKaizenCommand?commandId={commandId}")]
        KaizenCommand GetKaizenCommand(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetKaizenCommandMembers?commandId={commandId}")]
        List<KaizenCommandMembers> GetKaizenCommandMembers(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetListEvents?commandId={commandId}")]
        List<KaizenEvent> GetListEvents(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetListGoals?commandId={commandId}")]
        List<KaizenGoals> GetListGoals(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetListProblem?commandId={commandId}")]
        List<KaizenProblem> GetListProblem(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetListRootCauses?problemId={problemId}")]
        List<KaizenRootCauses> GetListRootCauses(int problemId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetListRootCause?commandId={commandId}")]
        List<KaizenRootCauses> GetListRootCause(int commandId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetProblem?problemId={problemId}")]
        KaizenProblem GetProblem(int problemId);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetRootCauses?idCause={idCause}")]
        KaizenRootCauses GetRootCauses(int idCause);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetCommandMembers")]
        int SetCommandMembers(Stream input);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetEvent")]
        int SetEvent(Stream input);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetGoals")]
        int SetGoals(Stream input);


        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetKaizenCommand")]
        int SetKaizenCommand(Stream input);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetProblems")]
        int SetProblems(Stream input);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/SetRootCauses")]
        int SetRootCauses(Stream input);
    }

    [DataContract]
    public class KaizenRootCauses
    {
        private int causeId;
        private string cause;
        private string classifier;
        private float prioritizing;

        [DataMember]
        public int CauseId
        {
            get
            {
                return causeId;
            }

            set
            {
                causeId = value;
            }
        }

        [DataMember]
        public string Cause
        {
            get
            {
                return cause;
            }

            set
            {
                cause = value;
            }
        }

        [DataMember]
        public string Classifier
        {
            get
            {
                return classifier;
            }

            set
            {
                classifier = value;
            }
        }

        [DataMember]
        public float Prioritizing
        {
            get
            {
                return prioritizing;
            }

            set
            {
                prioritizing = value;
            }
        }
    }

    [DataContract]
    public class KaizenProblem
    {
        private int id;
        private string problemText;
        private string whatHappen;
        private string whereHappen;
        private string whenHappen;
        private string howOften;
        private string howDoYouKnow;
        private string whyImportant;
        private bool wasWorked;
        private string effect;
        private string fakt1;
        private string fakt2;
        private string fakt3;
        private string fakt4;
        private string fakt5;
        private string howSolvelem;
        private string whatIdeasIdWorked;
        private string whyIdeasNotImplemanted;

        [DataMember]
        public string ProblemText
        {
            get
            {
                return problemText;
            }

            set
            {
                problemText = value;
            }
        }

        [DataMember]
        public string WhatHappen
        {
            get
            {
                return whatHappen;
            }

            set
            {
                whatHappen = value;
            }
        }

        [DataMember]
        public string WhereHappen
        {
            get
            {
                return whereHappen;
            }

            set
            {
                whereHappen = value;
            }
        }

        [DataMember]
        public string WhenHappen
        {
            get
            {
                return whenHappen;
            }

            set
            {
                whenHappen = value;
            }
        }

        [DataMember]
        public string HowOften
        {
            get
            {
                return howOften;
            }

            set
            {
                howOften = value;
            }
        }

        [DataMember]
        public string HowDoYouKnow
        {
            get
            {
                return howDoYouKnow;
            }

            set
            {
                howDoYouKnow = value;
            }
        }

        [DataMember]
        public string WhyImportant
        {
            get
            {
                return whyImportant;
            }

            set
            {
                whyImportant = value;
            }
        }

        [DataMember]
        public bool WasWorked
        {
            get
            {
                return wasWorked;
            }

            set
            {
                wasWorked = value;
            }
        }

        [DataMember]
        public string Effect
        {
            get
            {
                return effect;
            }

            set
            {
                effect = value;
            }
        }

        [DataMember]
        public string Fakt1
        {
            get
            {
                return fakt1;
            }

            set
            {
                fakt1 = value;
            }
        }

        [DataMember]
        public string Fakt2
        {
            get
            {
                return fakt2;
            }

            set
            {
                fakt2 = value;
            }
        }

        [DataMember]
        public string Fakt3
        {
            get
            {
                return fakt3;
            }

            set
            {
                fakt3 = value;
            }
        }

        [DataMember]
        public string Fakt4
        {
            get
            {
                return fakt4;
            }

            set
            {
                fakt4 = value;
            }
        }

        [DataMember]
        public string Fakt5
        {
            get
            {
                return fakt5;
            }

            set
            {
                fakt5 = value;
            }
        }

        [DataMember]
        public string HowSolvelem
        {
            get
            {
                return howSolvelem;
            }

            set
            {
                howSolvelem = value;
            }
        }

        [DataMember]
        public string WhatIdeasIdWorked
        {
            get
            {
                return whatIdeasIdWorked;
            }

            set
            {
                whatIdeasIdWorked = value;
            }
        }

        [DataMember]
        public string WhyIdeasNotImplemanted
        {
            get
            {
                return whyIdeasNotImplemanted;
            }

            set
            {
                whyIdeasNotImplemanted = value;
            }
        }

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }
    }

    [DataContract]
    public class KaizenCommandMembers
    {
        private string member;

        [DataMember]
        public string Member
        {
            get
            {
                return member;
            }

            set
            {
                member = value;
            }
        }
    }

    [DataContract]
    public class KaizenCommand
    {
        private int id;
        private int departmnet;
        private string commandName;
        private string customer;
        private string leader;
        private int commandType;
        private string subject;

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        [DataMember]
        public int DepartmentId
        {
            get
            {
                return departmnet;
            }

            set
            {
                departmnet = value;
            }
        }

        [DataMember]
        public string CommandName
        {
            get
            {
                return commandName;
            }

            set
            {
                commandName = value;
            }
        }

        [DataMember]
        public string Customer
        {
            get
            {
                return customer;
            }

            set
            {
                customer = value;
            }
        }

        [DataMember]
        public string Leader
        {
            get
            {
                return leader;
            }

            set
            {
                leader = value;
            }
        }

        [DataMember]
        public int CommandTypeId
        {
            get
            {
                return commandType;
            }

            set
            {
                commandType = value;
            }
        }

        [DataMember]
        public string Subject
        {
            get
            {
                return subject;
            }

            set
            {
                subject = value;
            }
        }
    }

    [DataContract]
    public class KaizenGoals
    {
        private int goalId;
        private string whatEliminate;
        private string measure;
        private string result;
        private string whenGetResult;
        private string goalText;

        [DataMember]
        public int GoalId
        {
            get
            {
                return goalId;
            }

            set
            {
                goalId = value;
            }
        }

        [DataMember]
        public string WhatEliminate
        {
            get
            {
                return whatEliminate;
            }

            set
            {
                whatEliminate = value;
            }
        }

        [DataMember]
        public string Measure
        {
            get
            {
                return measure;
            }

            set
            {
                measure = value;
            }
        }

        [DataMember]
        public string Result
        {
            get
            {
                return result;
            }

            set
            {
                result = value;
            }
        }

        [DataMember]
        public string WhenGetResult
        {
            get
            {
                return whenGetResult;
            }

            set
            {
                whenGetResult = value;
            }
        }

        [DataMember]
        public string GoalText
        {
            get
            {
                return goalText;
            }

            set
            {
                goalText = value;
            }
        }
    }

    [DataContract]
    public class KaizenEvent
    {
        private int id;
        private string kaIzenEvent;
        private string cause;
        private bool implementation;
        private string responsible;
        private string planDate;
        private string faktDate;
        private string resource;

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        [DataMember]
        public string KaIzenEvent
        {
            get
            {
                return kaIzenEvent;
            }

            set
            {
                kaIzenEvent = value;
            }
        }

        [DataMember]
        public string Cause
        {
            get
            {
                return cause;
            }

            set
            {
                cause = value;
            }
        }

        [DataMember]
        public bool Implementation
        {
            get
            {
                return implementation;
            }

            set
            {
                implementation = value;
            }
        }

        [DataMember]
        public string Responsible
        {
            get
            {
                return responsible;
            }

            set
            {
                responsible = value;
            }
        }

        [DataMember]
        public string PlanDate
        {
            get
            {
                return planDate;
            }

            set
            {
                planDate = value;
            }
        }

        [DataMember]
        public string FaktDate
        {
            get
            {
                return faktDate;
            }

            set
            {
                faktDate = value;
            }
        }

        [DataMember]
        public string Resource
        {
            get
            {
                return resource;
            }

            set
            {
                resource = value;
            }
        }
    }

    [DataContract]
    public class Department
    {
        private int id;
        private string name;

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        [DataMember]
        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }
    }

    [DataContract]
    public class Classifier
    {
        private int id;
        private string name;

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        [DataMember]
        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }
    }

    [DataContract]
    public class KaizenCommandType
    {
        private int id;
        private string name;

        [DataMember]
        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        [DataMember]
        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }
    }
}
