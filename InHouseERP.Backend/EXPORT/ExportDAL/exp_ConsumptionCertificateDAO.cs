using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ConsumptionCertificateDAO //: IDisposible
    {
        private static volatile exp_ConsumptionCertificateDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ConsumptionCertificateDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ConsumptionCertificateDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ConsumptionCertificateDAO();
                    }

                return instance;
            }
        }

        public static exp_ConsumptionCertificateDAO GetInstance()
        {
            if (instance == null) instance = new exp_ConsumptionCertificateDAO();
            return instance;
        }

        public List<exp_ConsumptionCertificate> GetAll(long? consumptionCertificateId = null,
            long? commercialInvoiceId = null)
        {
            try
            {
                var exp_ConsumptionCertificateLst = new List<exp_ConsumptionCertificate>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ConsumptionCertificateId", consumptionCertificateId, DbType.Int32,
                        ParameterDirection.Input)
                };
                exp_ConsumptionCertificateLst =
                    dbExecutor.FetchData<exp_ConsumptionCertificate>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificate_Get", colparameters);
                return exp_ConsumptionCertificateLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_ConsumptionCertificateLst = new List<exp_ConsumptionCertificate>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateLst =
                    dbExecutor.FetchData<exp_ConsumptionCertificate>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificate_GetDynamic", colparameters);
                return exp_ConsumptionCertificateLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_ConsumptionCertificateLst = new List<exp_ConsumptionCertificate>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateLst = dbExecutor.FetchDataRef<exp_ConsumptionCertificate>(
                    CommandType.StoredProcedure, "exp_ConsumptionCertificate_GetPaged", colparameters, ref rows);
                return exp_ConsumptionCertificateLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_ConsumptionCertificate _exp_ConsumptionCertificate)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@CommercialInvoiceId", _exp_ConsumptionCertificate.CommercialInvoiceId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StatementNo", _exp_ConsumptionCertificate.StatementNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@StatementDate", _exp_ConsumptionCertificate.StatementDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryNo", _exp_ConsumptionCertificate.BillOfEntryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryDate", _exp_ConsumptionCertificate.BillOfEntryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@EpzPermissionNo", _exp_ConsumptionCertificate.EpzPermissionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EpzPermissionDate", _exp_ConsumptionCertificate.EpzPermissionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificate.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificate.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_ConsumptionCertificate_Create",
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

        public int Update(exp_ConsumptionCertificate _exp_ConsumptionCertificate)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@ConsumptionCertificateId", _exp_ConsumptionCertificate.ConsumptionCertificateId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_ConsumptionCertificate.CommercialInvoiceId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StatementNo", _exp_ConsumptionCertificate.StatementNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@StatementDate", _exp_ConsumptionCertificate.StatementDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryNo", _exp_ConsumptionCertificate.BillOfEntryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryDate", _exp_ConsumptionCertificate.BillOfEntryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@EpzPermissionNo", _exp_ConsumptionCertificate.EpzPermissionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EpzPermissionDate", _exp_ConsumptionCertificate.EpzPermissionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificate.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificate.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_ConsumptionCertificate_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long consumptionCertificateId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ConsumptionCertificateId", consumptionCertificateId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_ConsumptionCertificate_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetByConsumptionCertificateForReports(long CommercialInvoiceId)
        {
            try
            {
                var exp_consumptionCertificateList = new List<exp_ConsumptionCertificate>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_consumptionCertificateList =
                    dbExecutor.FetchData<exp_ConsumptionCertificate>(CommandType.StoredProcedure,
                        "xRpt_exp_ConsumptionCertificate", colparameters);
                return exp_consumptionCertificateList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////
        ///exp_ConsumptionCertificateDescriptionDAO
        public List<exp_ConsumptionCertificateDescription> GetAllDescription(
            long? consumptionCertificateDescriptionId = null, long? consumptionCertificateId = null)
        {
            try
            {
                var exp_ConsumptionCertificateDescriptionLst = new List<exp_ConsumptionCertificateDescription>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ConsumptionCertificateDescriptionId", consumptionCertificateDescriptionId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ConsumptionCertificateId", consumptionCertificateId, DbType.Int64,
                        ParameterDirection.Input)
                };
                exp_ConsumptionCertificateDescriptionLst =
                    dbExecutor.FetchData<exp_ConsumptionCertificateDescription>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificateDescription_Get", colparameters);
                return exp_ConsumptionCertificateDescriptionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> GetDynamicDescription(string whereCondition,
            string orderByExpression)
        {
            try
            {
                var exp_ConsumptionCertificateDescriptionLst = new List<exp_ConsumptionCertificateDescription>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateDescriptionLst = dbExecutor.FetchData<exp_ConsumptionCertificateDescription>(
                    CommandType.StoredProcedure, "exp_ConsumptionCertificateDescription_GetDynamic", colparameters);
                return exp_ConsumptionCertificateDescriptionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> GetPagedDescription(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_ConsumptionCertificateDescriptionLst = new List<exp_ConsumptionCertificateDescription>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateDescriptionLst =
                    dbExecutor.FetchDataRef<exp_ConsumptionCertificateDescription>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificateDescription_GetPaged", colparameters, ref rows);
                return exp_ConsumptionCertificateDescriptionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostDescription(exp_ConsumptionCertificateDescription _exp_ConsumptionCertificateDescription)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@ConsumptionCertificateDescriptionId",
                        _exp_ConsumptionCertificateDescription.ConsumptionCertificateDescriptionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ConsumptionCertificateId",
                        _exp_ConsumptionCertificateDescription.ConsumptionCertificateId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _exp_ConsumptionCertificateDescription.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _exp_ConsumptionCertificateDescription.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _exp_ConsumptionCertificateDescription.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@QtyDescription", _exp_ConsumptionCertificateDescription.QtyDescription,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@Quantity", _exp_ConsumptionCertificateDescription.Quantity, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", _exp_ConsumptionCertificateDescription.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _exp_ConsumptionCertificateDescription.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificateDescription.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificateDescription.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateDescription_Post", colparameters, true);
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

        public int UpdateDescription(exp_ConsumptionCertificateDescription _exp_ConsumptionCertificateDescription)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ConsumptionCertificateDescriptionId",
                        _exp_ConsumptionCertificateDescription.ConsumptionCertificateDescriptionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ConsumptionCertificateId",
                        _exp_ConsumptionCertificateDescription.ConsumptionCertificateId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _exp_ConsumptionCertificateDescription.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@QtyDescription", _exp_ConsumptionCertificateDescription.QtyDescription,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@Quantity", _exp_ConsumptionCertificateDescription.Quantity, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", _exp_ConsumptionCertificateDescription.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _exp_ConsumptionCertificateDescription.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificateDescription.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificateDescription.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateDescription_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteDescription(long consumptionCertificateDescriptionId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ConsumptionCertificateDescriptionId", consumptionCertificateDescriptionId,
                        DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateDescription_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> Get_DescriptionOfGoods(int ciId)
        {
            try
            {
                var exp_ConsumptionCertificateDescriptionLst = new List<exp_ConsumptionCertificateDescription>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", ciId, DbType.Int64, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateDescriptionLst = dbExecutor.FetchData<exp_ConsumptionCertificateDescription>(
                    CommandType.StoredProcedure, "exp_ConsumptionCertificate_GetDescriptionOfGoods", colparameters);
                return exp_ConsumptionCertificateDescriptionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////
        ///exp_ConsumptionCertificateRawMaterialsDAO
        public List<exp_ConsumptionCertificateRawMaterials> GetAllRawMaterials(
            long? consumptionCertificateRawMaterialsId = null, long? consumptionCertificateId = null)
        {
            try
            {
                var exp_ConsumptionCertificateRawMaterialsLst = new List<exp_ConsumptionCertificateRawMaterials>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ConsumptionCertificateRawMaterialsId", consumptionCertificateRawMaterialsId,
                        DbType.Int32, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateRawMaterialsLst =
                    dbExecutor.FetchData<exp_ConsumptionCertificateRawMaterials>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificateRawMaterials_Get", colparameters);
                return exp_ConsumptionCertificateRawMaterialsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetDynamicRawMaterials(string whereCondition,
            string orderByExpression)
        {
            try
            {
                var exp_ConsumptionCertificateRawMaterialsLst = new List<exp_ConsumptionCertificateRawMaterials>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateRawMaterialsLst =
                    dbExecutor.FetchData<exp_ConsumptionCertificateRawMaterials>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificateRawMaterials_GetDynamic", colparameters);
                return exp_ConsumptionCertificateRawMaterialsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetPagedRawMaterials(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_ConsumptionCertificateRawMaterialsLst = new List<exp_ConsumptionCertificateRawMaterials>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateRawMaterialsLst =
                    dbExecutor.FetchDataRef<exp_ConsumptionCertificateRawMaterials>(CommandType.StoredProcedure,
                        "exp_ConsumptionCertificateRawMaterials_GetPaged", colparameters, ref rows);
                return exp_ConsumptionCertificateRawMaterialsLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddRawMaterials(exp_ConsumptionCertificateRawMaterials _exp_ConsumptionCertificateRawMaterials)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@ConsumptionCertificateId",
                        _exp_ConsumptionCertificateRawMaterials.ConsumptionCertificateId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ImportBondNo", _exp_ConsumptionCertificateRawMaterials.ImportBondNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreviousBalance", _exp_ConsumptionCertificateRawMaterials.PreviousBalance,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ExportQty", _exp_ConsumptionCertificateRawMaterials.ExportQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ClosingBalance", _exp_ConsumptionCertificateRawMaterials.ClosingBalance,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificateRawMaterials.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificateRawMaterials.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateRawMaterials_Create", colparameters, true);
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

        public List<exp_ConsumptionCertificateRawMaterials> GetByConsumptionCertificateRawMetrialByCiId(
            long CommercialInvoiceId)
        {
            try
            {
                var exp_consumptionCertificateList = new List<exp_ConsumptionCertificateRawMaterials>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_consumptionCertificateList = dbExecutor.FetchData<exp_ConsumptionCertificateRawMaterials>(
                    CommandType.StoredProcedure, "xRpt_exp_ConsumptionCertificateRawMaterials", colparameters);
                return exp_consumptionCertificateList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateRawMaterials(exp_ConsumptionCertificateRawMaterials _exp_ConsumptionCertificateRawMaterials)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@ConsumptionCertificateRawMaterialsId",
                        _exp_ConsumptionCertificateRawMaterials.ConsumptionCertificateRawMaterialsId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ConsumptionCertificateId",
                        _exp_ConsumptionCertificateRawMaterials.ConsumptionCertificateId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ImportBondNo", _exp_ConsumptionCertificateRawMaterials.ImportBondNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreviousBalance", _exp_ConsumptionCertificateRawMaterials.PreviousBalance,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ExportQty", _exp_ConsumptionCertificateRawMaterials.ExportQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ClosingBalance", _exp_ConsumptionCertificateRawMaterials.ClosingBalance,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_ConsumptionCertificateRawMaterials.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_ConsumptionCertificateRawMaterials.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateRawMaterials_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteRawMaterials(long consumptionCertificateRawMaterialsId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ConsumptionCertificateRawMaterialsId", consumptionCertificateRawMaterialsId,
                        DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_ConsumptionCertificateRawMaterials_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}