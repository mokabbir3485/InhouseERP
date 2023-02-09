using DbExecutor;
using SecurityEntity.SECURITY.SecurityBLL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityDAL
{
   public class ad_CancelProcessDAO
    {
        private static volatile ad_CancelProcessDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_CancelProcessDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_CancelProcessDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_CancelProcessDAO();
                    }

                return instance;
            }
        }

        public static ad_CancelProcessDAO GetInstance()
        {
            if (instance == null) instance = new ad_CancelProcessDAO();
            return instance;
        }

        public List<ad_CancelProcessScreen> GetAllScreen(int? screenId = null)
        {
            try
            {
                var s_ScreenLst = new List<ad_CancelProcessScreen>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@Id", screenId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenLst =
                    dbExecutor.FetchData<ad_CancelProcessScreen>(CommandType.StoredProcedure, "ad_CancelDocumentType_Get", colparameters);
                return s_ScreenLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CancelReason> GetAllReason(int? ReasonId = null)
        {
            try
            {
                var ad_CancelReasonList = new List<ad_CancelReason>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReasonId",ReasonId, DbType.Int64, ParameterDirection.Input)
                };
                ad_CancelReasonList =
                    dbExecutor.FetchData<ad_CancelReason>(CommandType.StoredProcedure, "ad_CancelReason_Get", colparameters);
                return ad_CancelReasonList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_DocumentGet_ForCancelProcess> GetAllDocument(string DocumentTypeCode, int ? CompanyId=null)
        {
            try
            {
                var ad_DocumentGet_ForCancelProcessList = new List<ad_DocumentGet_ForCancelProcess>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DocumentTypeCode",DocumentTypeCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyId",CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                ad_DocumentGet_ForCancelProcessList =
                    dbExecutor.FetchData<ad_DocumentGet_ForCancelProcess>(CommandType.StoredProcedure, "ad_DocumentGet_ForCancelProcess", colparameters);
                return ad_DocumentGet_ForCancelProcessList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CancelProcessCreate(ad_CancelProcess ad_CancelProcess)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DocumentId", ad_CancelProcess.DocumentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DocumentType", ad_CancelProcess.DocumentType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReasonDetails", ad_CancelProcess.ReasonDetails, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReasonId", ad_CancelProcess.ReasonId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", ad_CancelProcess.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Informedby", ad_CancelProcess.Informedby, DbType.Int32, ParameterDirection.Input),
                   
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CancelProcess_Create",
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

        public List<ad_CancelProcess> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
          string sortOrder, ref int rows)
        {
            try
            {
                var ad_CancelProcessList = new List<ad_CancelProcess>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_CancelProcessList = dbExecutor.FetchDataRef<ad_CancelProcess>(CommandType.StoredProcedure,
                    "ad_CancelProcess_GetPaged", colparameters, ref rows);
                return ad_CancelProcessList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
