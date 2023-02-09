using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ApprovalDAO //: IDisposible
    {
        private static volatile exp_ApprovalDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ApprovalDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ApprovalDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ApprovalDAO();
                    }

                return instance;
            }
        }

        public static exp_ApprovalDAO GetInstance()
        {
            if (instance == null) instance = new exp_ApprovalDAO();
            return instance;
        }

        public List<exp_Approval> GetAll(long? approvalId = null)
        {
            try
            {
                var exp_ApprovalLst = new List<exp_Approval>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ApprovalId", approvalId, DbType.Int32, ParameterDirection.Input)
                };
                exp_ApprovalLst =
                    dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure, "exp_Approval_Get", colparameters);
                return exp_ApprovalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_ApprovalLst = new List<exp_Approval>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalLst = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetDynamic", colparameters);
                return exp_ApprovalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var exp_ApprovalLst = new List<exp_Approval>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalLst = dbExecutor.FetchDataRef<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetPaged", colparameters, ref rows);
                return exp_ApprovalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_Approval _exp_Approval)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@ApprovalType", _exp_Approval.ApprovalType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DocumentId", _exp_Approval.DocumentId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@AmendmentReasonId", _exp_Approval.AmendmentReasonId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequestRemarks", _exp_Approval.RequestRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdateBy", _exp_Approval.UpdateBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _exp_Approval.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_Approval_Create",
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

        public int Update(exp_Approval _exp_Approval)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@ApprovalId", _exp_Approval.ApprovalId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsApproved", _exp_Approval.IsApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _exp_Approval.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _exp_Approval.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Password", _exp_Approval.ApprovalPassword, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdateBy", _exp_Approval.UpdateBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _exp_Approval.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Approval_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long approvalId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ApprovalId", approvalId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Approval_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetCommercialInvoice(string approvalType)
        {
            try
            {
                var exp_ApprovalGetCI = new List<exp_Approval>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalGetCI = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetCommercialInvoice", colparameters);
                return exp_ApprovalGetCI;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetExpGenerate(string approvalType)
        {
            try
            {
                var exp_ApprovalGetExpGenerate = new List<exp_Approval>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalGetExpGenerate = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetExpGenerate", colparameters);
                return exp_ApprovalGetExpGenerate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetProformaInvoice(string approvalType)
        {
            try
            {
                var exp_ApprovalGetPI = new List<exp_Approval>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalGetPI = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetProformaInvoice", colparameters);
                return exp_ApprovalGetPI;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetSalesOrder(string approvalType, string DepartmentName, int SectionId)
        {
            try
            {
                var exp_ApprovalGetSalesOrder = new List<exp_Approval>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DepartmentName", DepartmentName, DbType.String, ParameterDirection.Input),
                    new Parameters("@SectionId", SectionId, DbType.Int32, ParameterDirection.Input)
                };
                exp_ApprovalGetSalesOrder = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetSalesOrder", colparameters);
                return exp_ApprovalGetSalesOrder;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetInternalWorkOrder(string approvalType, string DepartmentName, int SectionId)
        {
            try
            {
                var exp_ApprovalGetInternalWorkOrder = new List<exp_Approval>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DepartmentName", DepartmentName, DbType.String, ParameterDirection.Input),
                    new Parameters("@SectionId", SectionId, DbType.Int32, ParameterDirection.Input)
                };
                exp_ApprovalGetInternalWorkOrder = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Approval_GetInternalWorkOrder", colparameters);
                return exp_ApprovalGetInternalWorkOrder;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> DuplicateCheck(string approvalType, string approvalPassword)
        {
            try
            {
                var exp_ApprovalLst = new List<exp_Approval>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input)
                };
                exp_ApprovalLst = dbExecutor.FetchData<exp_Approval>(CommandType.StoredProcedure,
                    "exp_Amendment_Checkduplicate", colparameters);
                return exp_ApprovalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> exp_ExpAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                var exp_PaymentProcessList = new List<exp_PaymentProcess>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input)
                };
                exp_PaymentProcessList = dbExecutor.FetchData<exp_PaymentProcess>(CommandType.StoredProcedure,
                    "exp_ExpAmendment_GetForEdit", colparameters);
                return exp_PaymentProcessList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> exp_PiAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                var exp_InvoiceList = new List<exp_Invoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input)
                };
                exp_InvoiceList = dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure,
                    "exp_PiAmendment_GetForEdit", colparameters);
                return exp_InvoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> exp_CiAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                var exp_CommercialInvoiceList = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceList = dbExecutor.FetchData<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_CiAmendment_GetForEdit", colparameters);
                return exp_CommercialInvoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}