using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_UploadAttachmentDAO //: IDisposible
    {
        private static volatile exp_UploadAttachmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_UploadAttachmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_UploadAttachmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_UploadAttachmentDAO();
                    }

                return instance;
            }
        }

        public static exp_UploadAttachmentDAO GetInstance()
        {
            if (instance == null) instance = new exp_UploadAttachmentDAO();
            return instance;
        }

        public List<exp_UploadAttachment> GetAll(string DocType = null, long? DocId = null)
        {
            try
            {
                var exp_UploadAttachmentLst = new List<exp_UploadAttachment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DocType", DocType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DocId", DocId, DbType.Int64, ParameterDirection.Input)
                };
                exp_UploadAttachmentLst = dbExecutor.FetchData<exp_UploadAttachment>(CommandType.StoredProcedure,
                    "exp_UploadAttachment_Get", colparameters);
                return exp_UploadAttachmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(exp_UploadAttachment _exp_UploadAttachment)
        {
            var ret = string.Empty;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DocType", _exp_UploadAttachment.DocType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DocId", _exp_UploadAttachment.DocId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@Title", _exp_UploadAttachment.Title, DbType.String, ParameterDirection.Input),
                    new Parameters("@Attachment", _exp_UploadAttachment.Attachment, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_UploadAttachment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_UploadAttachment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "exp_UploadAttachment_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public void Update(exp_UploadAttachment _exp_UploadAttachment)
        {
            //string ret = string.Empty;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@Id", _exp_UploadAttachment.Id, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DocType", _exp_UploadAttachment.DocType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DocId", _exp_UploadAttachment.DocId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@Title", _exp_UploadAttachment.Title, DbType.String, ParameterDirection.Input),
                    new Parameters("@Attachment", _exp_UploadAttachment.Attachment, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_UploadAttachment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_UploadAttachment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_UploadAttachment_Update", colparameters,
                    true);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            //return;
        }
    }
}