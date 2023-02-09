using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PosEntity;

namespace PosDAL
{
    public class pos_SalesOrderDetailDAO //: IDisposible
    {
        private static volatile pos_SalesOrderDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pos_SalesOrderDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pos_SalesOrderDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pos_SalesOrderDetailDAO();
                    }

                return instance;
            }
        }

        public static pos_SalesOrderDetailDAO GetInstance()
        {
            if (instance == null) instance = new pos_SalesOrderDetailDAO();
            return instance;
        }

        public List<pos_SalesOrderDetail> SalesOrderReport(long? SalesOrderId = null)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", SalesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "xRpt_pos_SalesOrderBySalesOrderId", colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> SalesOrderDetailItemGetByCompanyId(int CompanyId)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "pos_SalesOrderDetailItem_GetByCompanyId", colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetBySalesOrderId(long salesOrderId)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", salesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "pos_SalesOrderDetail_GetBySalesOrderId", colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "pos_SalesOrderDetail_GetDynamic", colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_CompanyEmployeeItem> GetCompanyEmployeeItem()
        {
            try
            {
                var pos_CompanyEmployeeItemLst = new List<pos_CompanyEmployeeItem>();
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                //    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                //};
                pos_CompanyEmployeeItemLst = dbExecutor.FetchData<pos_CompanyEmployeeItem>(CommandType.StoredProcedure,
                    "pos_SalesOrderDetail_GetCompanyEmployeeItem", null);
                return pos_CompanyEmployeeItemLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchDataRef<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "pos_SalesOrderDetail_GetPaged", colparameters, ref rows);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostSODetail(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@SalesOrderDetailId", _pos_SalesOrderDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _pos_SalesOrderDetail.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _pos_SalesOrderDetail.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@OrderUnitId", _pos_SalesOrderDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OrderQty", _pos_SalesOrderDetail.OrderQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OrderPrice", _pos_SalesOrderDetail.OrderPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OrderPriceBDT", _pos_SalesOrderDetail.OrderPriceBDT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VatAmount", _pos_SalesOrderDetail.VatAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VatPercentage", _pos_SalesOrderDetail.VatPercentage, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@DueDate", _pos_SalesOrderDetail.DueDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _pos_SalesOrderDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BuyerName", _pos_SalesOrderDetail.BuyerName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsVoid", _pos_SalesOrderDetail.IsVoid, DbType.Boolean,
                        ParameterDirection.Input)
                    

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_SalesOrderDetail_Post",
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
        public long PostAdditionalInfo(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@SODAddId", _pos_SalesOrderDetail.SODAddId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderDetailId", _pos_SalesOrderDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _pos_SalesOrderDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@HsCodeId", _pos_SalesOrderDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _pos_SalesOrderDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _pos_SalesOrderDetail.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _pos_SalesOrderDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _pos_SalesOrderDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _pos_SalesOrderDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PcPerRoll", _pos_SalesOrderDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollPerCarton", _pos_SalesOrderDetail.RollPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", _pos_SalesOrderDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollWeight", _pos_SalesOrderDetail.RollWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonWeight", _pos_SalesOrderDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonSize", _pos_SalesOrderDetail.CartonSize, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RollDirection", _pos_SalesOrderDetail.RollDirection, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Ups", _pos_SalesOrderDetail.Ups, DbType.String,
                        ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_SalesOrderDetailAdditionalInfo_Post",
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

        public int Update(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@SalesOrderDetailId", _pos_SalesOrderDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _pos_SalesOrderDetail.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _pos_SalesOrderDetail.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@OrderUnitId", _pos_SalesOrderDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OrderQty", _pos_SalesOrderDetail.OrderQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OrderPrice", _pos_SalesOrderDetail.OrderPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@DueDate", _pos_SalesOrderDetail.DueDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrderDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateOrderQty(pos_SalesOrderDetail _pos_SalesOrderDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@SalesOrderId", _pos_SalesOrderDetail.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderDetailId", _pos_SalesOrderDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _pos_SalesOrderDetail.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@OrderQty", _pos_SalesOrderDetail.OrderQty, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrderDetail_UpdateOrderQty",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long salesOrderDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderDetailId", salesOrderDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrderDetail_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeleteSalesOrderDetail(long salesOrderDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderDetailId", salesOrderDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrderDetail_DeleteBySalesOrderDetailId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeleteAdditionalInfo(long salesOrderDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderDetailId", salesOrderDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrderDetailAdditionalInfo_DeleteBySalesOrderDetailId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrderDetail> GetInvoiceDetail(long invoiceId)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst = dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure,
                    "exp_InvoiceDetail_GetByInvoiceId", colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrderDetail> GetItemForIWO(long salesOrderId)
        {
            try
            {
                var pos_SalesOrderDetailLst = new List<pos_SalesOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", salesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderDetailLst =
                    dbExecutor.FetchData<pos_SalesOrderDetail>(CommandType.StoredProcedure, "GetItemForIWO",
                        colparameters);
                return pos_SalesOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}