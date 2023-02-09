using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityDAL
{
    public class ad_PaymentTypeDAO //: IDisposible
    {
        private static volatile ad_PaymentTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_PaymentTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_PaymentTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_PaymentTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_PaymentTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_PaymentTypeDAO();
            return instance;
        }

        public List<pay_MobileBankingService> GetAll()
        {
            try
            {
                var pay_MobileBankingServiceLst = new List<pay_MobileBankingService>();
                pay_MobileBankingServiceLst =
                    dbExecutor.FetchData<pay_MobileBankingService>(CommandType.StoredProcedure,
                        "pay_MobileBankingService_Get");
                return pay_MobileBankingServiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_PaymentSubType> PaymentSubTypeGet()
        {
            try
            {
                var ad_PaymentGroupLst = new List<ad_PaymentSubType>();
                ad_PaymentGroupLst =
                    dbExecutor.FetchData<ad_PaymentSubType>(CommandType.StoredProcedure, "ad_PaymentSubType_Get");
                return ad_PaymentGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_PaymentType> GetAllActive()
        {
            try
            {
                var ad_PaymentTypeLst = new List<ad_PaymentType>();
                ad_PaymentTypeLst =
                    dbExecutor.FetchData<ad_PaymentType>(CommandType.StoredProcedure, "ad_PaymentType_GetAllActive");
                return ad_PaymentTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PaymentType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_PaymentTypeLst = new List<ad_PaymentType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_PaymentTypeLst = dbExecutor.FetchData<ad_PaymentType>(CommandType.StoredProcedure,
                    "ad_PaymentType_GetDynamic", colparameters);
                return ad_PaymentTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PaymentType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_PaymentTypeLst = new List<ad_PaymentType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_PaymentTypeLst = dbExecutor.FetchDataRef<ad_PaymentType>(CommandType.StoredProcedure,
                    "ad_PaymentType_GetPaged", colparameters, ref rows);
                return ad_PaymentTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_PaymentSubType> GetPaymentSubTypePaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
          string sortOrder, ref int rows)
        {
            try
            {
                var ad_PaymentSubTypeLst = new List<ad_PaymentSubType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_PaymentSubTypeLst = dbExecutor.FetchDataRef<ad_PaymentSubType>(CommandType.StoredProcedure,
                    "ad_PaymentSubType_GetPaged", colparameters, ref rows);
                return ad_PaymentSubTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Add(ad_PaymentType _ad_PaymentType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@PaymentGroupId", _ad_PaymentType.PaymentGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeName", _ad_PaymentType.PaymentTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Code", _ad_PaymentType.Code, DbType.String, ParameterDirection.Input),
                    new Parameters("@CommissionPercent", _ad_PaymentType.CommissionPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_PaymentType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsFixed", _ad_PaymentType.IsFixed, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_PaymentType.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_PaymentType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_PaymentType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_PaymentType.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                   
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_PaymentType_Create",
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


        public int PaymentSubTypeAdd(ad_PaymentSubType _ad_PaymentSubType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@PaymentSubTypeId", _ad_PaymentSubType.PaymentSubTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _ad_PaymentSubType.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentSubTypeName", _ad_PaymentSubType.PaymentSubTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_PaymentSubType.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_PaymentSubType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_PaymentSubType.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_PaymentSubType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_PaymentSubType.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_PaymentSubType_Create_Post",
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
        public int Update(ad_PaymentType _ad_PaymentType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@PaymentGroupId", _ad_PaymentType.PaymentGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _ad_PaymentType.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@Code", _ad_PaymentType.Code, DbType.String, ParameterDirection.Input),
                    new Parameters("@PaymentTypeName", _ad_PaymentType.PaymentTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CommissionPercent", _ad_PaymentType.CommissionPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_PaymentType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsFixed", _ad_PaymentType.IsFixed, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_PaymentType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_PaymentType.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_PaymentType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int paymentTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentTypeId", paymentTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_PaymentType_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_ChequeType> GetChequeType(Int32 ? ChequeTypeId=null)
        {
            try
            {
                var ad_ChequeTypeList = new List<ad_ChequeType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ChequeTypeId", ChequeTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ChequeTypeList =
                    dbExecutor.FetchData<ad_ChequeType>(CommandType.StoredProcedure,
                        "ad_ChequeType_Get", colparameters);
                return ad_ChequeTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}