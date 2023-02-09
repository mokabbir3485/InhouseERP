using DbExecutor;
using PosEntity;
using SecurityEntity.POS.PosEntity;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace PosDAL
{
    public class pos_SalesInvoiceDAO
    {
        private static volatile pos_SalesInvoiceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pos_SalesInvoiceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pos_SalesInvoiceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pos_SalesInvoiceDAO();
                    }

                return instance;
            }
        }

        public static pos_SalesInvoiceDAO GetInstance()
        {
            if (instance == null) instance = new pos_SalesInvoiceDAO();
            return instance;
        }
        public List<pos_SalesInvoice> GetDynamicForSalesInvoice(string whereCondition,
            string orderByExpression)
        {
            try
            {
                var SalesInvoiceLst = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                SalesInvoiceLst = dbExecutor.FetchData<pos_SalesInvoice>(CommandType.StoredProcedure,
                    "pos_SalesInvoice_GetDynamic", colparameters);
                return SalesInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesInvoice> GetInvoiceWithAcknowledgement(Int32 companyId, DateTime ? formDate=null, DateTime ? toDate=null)
        {
            try
            {
                var SalesInvoiceLst = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@FromDate", formDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@ToDate", toDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input),
                };
                SalesInvoiceLst = dbExecutor.FetchData<pos_SalesInvoice>(CommandType.StoredProcedure,
                    "pos_SalesInvoice_GetInvoiceWithAcknowledgement", colparameters);
                return SalesInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetailBySalesInvoiceId(long SalesInvoiceId)
        {
            try
            {
                var pos_SalesInvoiceDetailLst = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesInvoiceDetailLst = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "pos_SalesInvoiceDetail_GetBySalesInvoiceId", colparameters);
                return pos_SalesInvoiceDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetCompanyForPayment(int? companyId = null)
        {
            try
            {
                var ad_CompanyLst = new List<pos_SalesInvoice>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                //};
                ad_CompanyLst =
                    dbExecutor.FetchData<pos_SalesInvoice>(CommandType.StoredProcedure, "pos_SalesInvoice_GetCompanyForPayment", null);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
         public List<pos_SalesInvoice> GetAllManualSalesInvoice(int? companyId = null)
        {
            try
            {
                var ad_CompanyLst = new List<pos_SalesInvoice>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                //};
                ad_CompanyLst =
                    dbExecutor.FetchData<pos_SalesInvoice>(CommandType.StoredProcedure, "pos_ManualInvoice_Get", null);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesInvoiceTemp> GetAllSalesInvoice()
        {
            try
            {
                var pos_SalesInvoiceLst = new List<pos_SalesInvoiceTemp>();

                pos_SalesInvoiceLst =
                    dbExecutor.FetchData<pos_SalesInvoiceTemp>(CommandType.StoredProcedure, "pos_SalesInvoice_GetAll");
                return pos_SalesInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAcknowledgement> GetReportForCreditAcknoledge(long SaleAcknowledgementId)
        {
            try
            {
                var rcv_SaleAcknowledgementLst = new List<rcv_SaleAcknowledgement>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SaleAcknowledgementId", SaleAcknowledgementId, DbType.Int64, ParameterDirection.Input)
                };
                rcv_SaleAcknowledgementLst = dbExecutor.FetchData<rcv_SaleAcknowledgement>(CommandType.StoredProcedure,
                    "xRpt_rcv_SalesAcknowledgement_GetBySaleAcknowledgementId", colparameters);
                return rcv_SaleAcknowledgementLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long Post(pos_SalesInvoice _pos_SalesInvoice)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@SalesInvoiceId", _pos_SalesInvoice.SalesInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesInvoiceNo", _pos_SalesInvoice.SalesInvoiceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ManualInvoiceNo", _pos_SalesInvoice.ManualInvoiceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VatChallanNo", _pos_SalesInvoice.VatChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SalesInvoiceDate", _pos_SalesInvoice.SalesInvoiceDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", _pos_SalesInvoice.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CurrencyId", _pos_SalesInvoice.CurrencyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsOnCredit", _pos_SalesInvoice.IsOnCredit, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@DeliveryIds", _pos_SalesInvoice.DeliveryIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _pos_SalesInvoice.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsCPT", _pos_SalesInvoice.IsCPT, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CPTCost", _pos_SalesInvoice.CPTCost, DbType.Decimal, ParameterDirection.Input),
                    
                    new Parameters("@CreatorId", _pos_SalesInvoice.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pos_SalesInvoice.UpdatorId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_SalesInvoice_Post",
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
        public long PostManualInvoice(pos_SalesInvoice _pos_SalesInvoice)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[18]
                {
                    new Parameters("@ManualInvoiceId", _pos_SalesInvoice.ManualInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ManualInvoiceNo", _pos_SalesInvoice.ManualInvoiceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ManualInvoiceDate", _pos_SalesInvoice.ManualInvoiceDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _pos_SalesInvoice.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@VatChallanNo", _pos_SalesInvoice.VatChallanNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@DeliveryNo", _pos_SalesInvoice.DeliveryNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _pos_SalesInvoice.DeliveryDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@PONo", _pos_SalesInvoice.PONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PODate", _pos_SalesInvoice.PODate, DbType.String, ParameterDirection.Input),
                    
                    new Parameters("@CompanyId", _pos_SalesInvoice.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyNameBilling", _pos_SalesInvoice.CompanyNameBilling, DbType.String, ParameterDirection.Input),
                    new Parameters("@AddressBilling", _pos_SalesInvoice.AddressBilling, DbType.String, ParameterDirection.Input),
                    new Parameters("@CurrencyId", _pos_SalesInvoice.CurrencyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ConversionRate", _pos_SalesInvoice.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalVatAmount", _pos_SalesInvoice.TotalVatAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmount", _pos_SalesInvoice.TotalAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@Remarks", _pos_SalesInvoice.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pos_SalesInvoice.UpdatorId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_ManualInvoice_Post",
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
        public long PostSalesInvoiceDetail(pos_SalesInvoiceDetail pos_SalesInvoiceDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@SalesInvoiceId", pos_SalesInvoiceDetail.SalesInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesInvoiceDetailId", pos_SalesInvoiceDetail.SalesInvoiceDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDetailId", pos_SalesInvoiceDetail.DeliveryDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderDetailId", pos_SalesInvoiceDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryUnitId", pos_SalesInvoiceDetail.DeliveryUnitId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", pos_SalesInvoiceDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", pos_SalesInvoiceDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", pos_SalesInvoiceDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    
                    new Parameters("@DeliveryQuantity", pos_SalesInvoiceDetail.DeliveryQuantity, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@DeliveryUnitPrice", pos_SalesInvoiceDetail.DeliveryUnitPrice, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VatPercentage", pos_SalesInvoiceDetail.VatPercentage, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VatAmount", pos_SalesInvoiceDetail.VatAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ConversionRate", pos_SalesInvoiceDetail.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@OrderPriceBDT", pos_SalesInvoiceDetail.OrderPriceBDT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PcPerRoll", pos_SalesInvoiceDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", pos_SalesInvoiceDetail.LabelBrandId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", pos_SalesInvoiceDetail.MaterialTypeId, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_SalesInvoiceDetail_Post",
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
        

        public Int32 AdditionalSalesInvoiceCostSave(pos_AdditionalSalesInvoiceCost pos_AdditionalSalesInvoiceCost)
        {
            Int32 ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                  new Parameters("@SalesInvoiceId", pos_AdditionalSalesInvoiceCost.SalesInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                  new Parameters("@CostPurpose", pos_AdditionalSalesInvoiceCost.CostPurpose, DbType.String,
                        ParameterDirection.Input),
                  new Parameters("@Amount", pos_AdditionalSalesInvoiceCost.Amount, DbType.Int64,
                        ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "pos_AdditionalSalesInvoiceCost_Post",
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
        public long PostManualInvoiceDetail(pos_SalesInvoiceDetail pos_SalesInvoiceDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@ManualInvoiceDetailId", pos_SalesInvoiceDetail.ManualInvoiceDetailId, DbType.Int64,
                        ParameterDirection.Input),
                   new Parameters("@ManualInvoiceId", pos_SalesInvoiceDetail.ManualInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                   
                    new Parameters("@ItemId", pos_SalesInvoiceDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", pos_SalesInvoiceDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Quantity", pos_SalesInvoiceDetail.Quantity, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPrice", pos_SalesInvoiceDetail.UnitPrice, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPriceBDT", pos_SalesInvoiceDetail.UnitPriceBDT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VatPercentage", pos_SalesInvoiceDetail.VatPercentage, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VatAmount", pos_SalesInvoiceDetail.VatAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PcPerRoll", pos_SalesInvoiceDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemUnitId", pos_SalesInvoiceDetail.ItemUnitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", pos_SalesInvoiceDetail.MaterialTypeId, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_ManualInvoiceDetail_Post",
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
        public int DeletedSalesInvoiceDetailBySalesInvoiceDetailId(long SalesInvoiceDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesInvoiceDetailId", SalesInvoiceDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "pos_SalesInvoiceDetail_DeleteBySalesInvoiceDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeletedManualInvoiceDetailByManualInvoiceDetailId(long ManualInvoiceDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualInvoiceDetailId", ManualInvoiceDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "pos_ManualInvoiceDetail_DeleteByManualInvoiceDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 SaveSalesInvoice_StockDeliveryId(long SalesInvoiceId,long DeliveryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DeliveryId", DeliveryId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "pos_SalesInvoice_StockDelivery_Create", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long PostAcknowledge(pos_SalesInvoice rcv_Acknowledge)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@SaleAcknowledgementId", rcv_Acknowledge.SaleAcknowledgementId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AcknowledgementNo", rcv_Acknowledge.AcknowledgementNo, DbType.String,
                        ParameterDirection.Input),
                  
                    new Parameters("@AcknowledgementDate", rcv_Acknowledge.AcknowledgementDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@AcknowledgedBy", rcv_Acknowledge.AcknowledgedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SalesInvoiceId", rcv_Acknowledge.SalesInvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@UpdatorId", rcv_Acknowledge.UpdatorId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_SaleAcknowledgement_Post",
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

        public List<pos_SalesInvoice> GetPagedAcknowledge(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesInvoice = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoice = dbExecutor.FetchDataRef<pos_SalesInvoice>(CommandType.StoredProcedure,
                    "rcv_SaleAcknowledgement_GetPaged", colparameters, ref rows);
                return pos_SalesInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesInvoice = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoice = dbExecutor.FetchDataRef<pos_SalesInvoice>(CommandType.StoredProcedure,
                    "pos_SalesInvoice_GetPaged", colparameters, ref rows);
                return pos_SalesInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetPagedManualInvoice(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesInvoice = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoice = dbExecutor.FetchDataRef<pos_SalesInvoice>(CommandType.StoredProcedure,
                    "pos_ManualInvoice_GetPaged", colparameters, ref rows);
                return pos_SalesInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pos_AdditionalSalesInvoiceCost> AdditionalSalesInvoiceGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesInvoice = new List<pos_AdditionalSalesInvoiceCost>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoice = dbExecutor.FetchDataRef<pos_AdditionalSalesInvoiceCost>(CommandType.StoredProcedure,
                    "pos_AdditionalSalesInvoiceCost_GetPaged", colparameters, ref rows);
                return pos_SalesInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public DbDataReader GetMaxSalesInvoiceNo()
        //{
        //    try
        //    {
        //        var SalesInvoiceNo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "pos_GetMaxSalesInvoiceNo");
        //        return SalesInvoiceNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public Int64 GetMaxSalesInvoiceNo()
        {
            try
            {
                Int64 maxSalesInvoiceNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxSalesInvoiceNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_GetMaxSalesInvoiceNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxSalesInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetMaxManualInvoiceNo()
        {
            try
            {
                Int64 maxSalesInvoiceNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxSalesInvoiceNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_GetMaxManualInvoiceNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxSalesInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetMaxAcknowledgementNo(DateTime AcknowledgementDate)
        {
            try
            {

                Common aCommon = new Common();
                DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDate(AcknowledgementDate);

                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                Int64 maxAcknowledgementNo = 0;
                string AcknowledgementNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxAcknowledgementNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxSaleAcknowledgementNo", colparameters, true);
                string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(AcknowledgementDate);
                AcknowledgementNo = "SA/" + aFiscalYearPart + "/" + maxAcknowledgementNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return AcknowledgementNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetail(long SalesInvoiceId)
        {
            try
            {
                var pos_SalesInvoiceDetailList = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesInvoiceDetailList = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "pos_SalesInvoiceDetail_GetBySalesInvoiceId", colparameters);
                
                return pos_SalesInvoiceDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceDetail(long ManualInvoiceId)
        {
            try
            {
                var pos_SalesInvoiceDetailList = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualInvoiceId", ManualInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesInvoiceDetailList = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "pos_ManualInvoiceDetail_GetByInvoiceId", colparameters);
                
                return pos_SalesInvoiceDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetSalesInvoiceDetailForReport(long SalesInvoiceId, int? CurrencyId = null)
        {
            try
            {
                var pos_SalesInvoiceDetailList = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CurrencyId", CurrencyId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesInvoiceDetailList = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "xRpt_pos_SalesInvoice", colparameters);
                
                return pos_SalesInvoiceDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_Mushak_6_3> GetMushak_6_3BySalesInvoiceId(Int32? CompanyId = null, Int32? SalesInvoiceId = null)
        {
            try
            {
                var pos_Mushak_6_3List = new List<pos_Mushak_6_3>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_Mushak_6_3List = dbExecutor.FetchData<pos_Mushak_6_3>(CommandType.StoredProcedure,
                    "VAT_SalesInvoice_Mushak_6_3", colparameters);
                
                return pos_Mushak_6_3List;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceDetailForReport(long ManualInvoiceId)
        {
            try
            {
                var pos_SalesInvoiceDetailList = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualInvoiceId", ManualInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesInvoiceDetailList = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "xRpt_pos_ManualInvoice", colparameters);
                
                return pos_SalesInvoiceDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoiceDetail> GetManualInvoiceNoExist(string ManualInvoiceNo)
        {
            try
            {
                var pos_InvoiceNoExistList = new List<pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualInvoiceNo", ManualInvoiceNo, DbType.String, ParameterDirection.Input)
                };
                pos_InvoiceNoExistList = dbExecutor.FetchData<pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "pos_ManualInvoice_InvoiceNoExist", colparameters);
                
                return pos_InvoiceNoExistList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Xrpt_pos_SalesInvoiceDetail> GetDeliveryIds(string DeliveryIds)
        {
            try
            {
                var pos_SalesInvoiceList = new List<Xrpt_pos_SalesInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryIdsIds", DeliveryIds, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoiceList = dbExecutor.FetchData<Xrpt_pos_SalesInvoiceDetail>(CommandType.StoredProcedure,
                    "xrpt_pos_DeliveryIds", colparameters);
                return pos_SalesInvoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesInvoice> GetNumberPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var NumberLst = new List<pos_SalesInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                NumberLst = dbExecutor.FetchDataRef<pos_SalesInvoice>(CommandType.StoredProcedure, "pos_SalesTracking_GetPaged",
                    colparameters, ref rows);
                return NumberLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}