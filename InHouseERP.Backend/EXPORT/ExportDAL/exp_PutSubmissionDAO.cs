using System;
using System.Data;
using DbExecutor;

namespace ExportDAL
{
    public class exp_PutSubmissionDAO //: IDisposible
    {
        private static volatile exp_PutSubmissionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_PutSubmissionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_PutSubmissionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_PutSubmissionDAO();
                    }

                return instance;
            }
        }

        public static exp_PutSubmissionDAO GetInstance()
        {
            if (instance == null) instance = new exp_PutSubmissionDAO();
            return instance;
        }


        public int Put(string docType, long documentId, bool isSubmit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@DocType", docType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DocumentId", documentId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsSubmit", isSubmit, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_PutSubmission", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}