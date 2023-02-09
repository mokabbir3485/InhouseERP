using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_InvoiceDAO //: IDisposible
    {
        private static volatile exp_InvoiceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_InvoiceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_InvoiceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_InvoiceDAO();
                    }

                return instance;
            }
        }

        public static exp_InvoiceDAO GetInstance()
        {
            if (instance == null) instance = new exp_InvoiceDAO();
            return instance;
        }

        public List<exp_Invoice> GetPaymentProcessTypeAll(int? PaymentProcessTypeId = null)
        {
            try
            {
                var exp_InvoiceLst = new List<exp_Invoice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentProcessTypeId", PaymentProcessTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                exp_InvoiceLst = dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure,
                    "exp_PaymentProcessType_Get", colparameters);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetAll(long? invoiceId = null)
        {
            try
            {
                var exp_InvoiceLst = new List<exp_Invoice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int32, ParameterDirection.Input)
                };
                exp_InvoiceLst =
                    dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure, "exp_Invoice_Get", colparameters);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_InvoiceLst = new List<exp_Invoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_InvoiceLst = dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure,
                    "exp_Invoice_GetDynamic", colparameters);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetForCiUpdate(int CompanyId, long CommercialInvoiceId)
        {
            try
            {
                var exp_InvoiceLst = new List<exp_Invoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_InvoiceLst = dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure,
                    "exp_Invoice_GetForCIUpdate", colparameters);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> exp_Invoice_GetForEdit(DateTime fromDate, DateTime toDate, int? companyId)
        {
            try
            {
                var invoiceList = new List<exp_Invoice>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@FromDate", fromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", toDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                invoiceList = dbExecutor.FetchData<exp_Invoice>(CommandType.StoredProcedure, "exp_Invoice_GetForEdit",
                    colparameters);
                return invoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var exp_InvoiceLst = new List<exp_Invoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_InvoiceLst = dbExecutor.FetchDataRef<exp_Invoice>(CommandType.StoredProcedure,
                    "exp_Invoice_GetPaged", colparameters, ref rows);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Item> GetItemByInvoice(int invoiceId)
        {
            try
            {
                var list = new List<exp_Item>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int32, ParameterDirection.Input)
                };
                list =
                    dbExecutor.FetchData<exp_Item>(CommandType.StoredProcedure, "GetItemByInvoice",
                        colparameters);
                return list;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<exp_InvoiceDetail> InvoiceDetailGetBySalesOrderId(long salesOrderId)
        {
            try
            {
                var invoiceDtlList = new List<exp_InvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", salesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                invoiceDtlList = dbExecutor.FetchData<exp_InvoiceDetail>(CommandType.StoredProcedure,
                    "exp_InvoiceDetail_GetBySalesOrderId", colparameters);
                return invoiceDtlList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_InvoiceDetail> InvoiceDetailGetByInvoiceId(long invoice)
        {
            try
            {
                var invoiceDtlList = new List<exp_InvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoice, DbType.Int64, ParameterDirection.Input)
                };
                invoiceDtlList = dbExecutor.FetchData<exp_InvoiceDetail>(CommandType.StoredProcedure,
                    "exp_InvoiceDetail_GetByInvoiceId", colparameters);
                return invoiceDtlList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxInvoiceNo(int ExporterId)
        {
            try
            {
                //Common aCommon = new Common();
                //DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(invoiceDate);

                //Parameters[] colparameters = new Parameters[3]{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@ExporterId", ExporterId, DbType.Int32, ParameterDirection.Input)
                //};

                //var aCommon = new Common();
                Parameters[] colparameters;
                //if (ExporterId == 1)
                //{
                    //var aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(invoiceDate);
                    colparameters = new Parameters[1]
                    {
                        //new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                        //new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input),
                        new Parameters("@ExporterId", ExporterId, DbType.Int32, ParameterDirection.Input)
                    };
                //}
                //else
                //{
                    //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(invoiceDate);
                    //colparameters = new Parameters[3]
                    //{
                    //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input),
                    //    new Parameters("@ExporterId", ExporterId, DbType.Int32, ParameterDirection.Input)
                    //};
                //}

                Int64 maxInvoiceNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                //maxInvoiceNo = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                //    "SELECT InvoiceNo=CAST((ISNULL(MAX(CAST(RIGHT(InvoiceNo, CHARINDEX('-', REVERSE(InvoiceNo)) - 1) AS BIGINT)),0)+1) AS VARCHAR(50)) FROM exp_Invoice WHERE InvoiceNo IS NOT NULL AND LEN(InvoiceNo)>=10 AND ([InvoiceDate] BETWEEN @fromDate AND @toDate) AND ExporterId=@ExporterId ",
                //    colparameters, true);
                maxInvoiceNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_GetMaxInvoiceNo", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(exp_Invoice _exp_Invoice)
        {
            var ret = string.Empty;
            try
            {
                //Common aCommon = new Common();
                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_exp_Invoice.InvoiceDate);

                //if (_exp_Invoice.Factory == "Uttara")
                //    _exp_Invoice.InvoiceNo = "RTL/" + aFiscalYearPart + "/" + _exp_Invoice.InvoiceType + "-" + _exp_Invoice.InvoiceNo;
                //else
                //    _exp_Invoice.InvoiceNo = "RTLE/" + aFiscalYearPart + "/" + _exp_Invoice.InvoiceType + "-" + _exp_Invoice.InvoiceNo;

                var colparameters = new Parameters[20]
                {
                    new Parameters("@InvoiceNo", _exp_Invoice.InvoiceNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PINoPostfix", _exp_Invoice.PINoPostfix, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceType", _exp_Invoice.InvoiceType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExporterBankId", _exp_Invoice.ExporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankId", _exp_Invoice.ImporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PlaceOfLoading", _exp_Invoice.PlaceOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FindDestination", _exp_Invoice.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TypeOfCarrier", _exp_Invoice.TypeOfCarrier, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionOfGoods", _exp_Invoice.DescriptionOfGoods, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactNo", _exp_Invoice.MasterContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactDate", _exp_Invoice.MasterContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderIds", _exp_Invoice.SalesOrderIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceDate", _exp_Invoice.InvoiceDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Factory", _exp_Invoice.Factory, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyNameBilling", _exp_Invoice.CompanyNameBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressBilling", _exp_Invoice.AddressBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameDelivery", _exp_Invoice.CompanyNameDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressDelivery", _exp_Invoice.AddressDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_Invoice.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_Invoice.UpdatedDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "exp_Invoice_Create",
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

        public string Post(exp_Invoice _exp_Invoice)
        {
            var ret = string.Empty;
            try
            {
                var colparameters = new Parameters[30]
                {
                    new Parameters("@InvoiceId", _exp_Invoice.InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InvoiceNo", _exp_Invoice.InvoiceNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PINoPostfix", _exp_Invoice.PINoPostfix, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceType", _exp_Invoice.InvoiceType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExporterBankId", _exp_Invoice.ExporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankId", _exp_Invoice.ImporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PlaceOfLoading", _exp_Invoice.PlaceOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FinalDestination", _exp_Invoice.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TypeOfCarrier", _exp_Invoice.TypeOfCarrier, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionOfGoods", _exp_Invoice.DescriptionOfGoods, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactNo", _exp_Invoice.MasterContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactDate", _exp_Invoice.MasterContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderIds", _exp_Invoice.SalesOrderIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceDate", _exp_Invoice.InvoiceDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Factory", _exp_Invoice.Factory, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExporterId", _exp_Invoice.ExporterId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyNameBilling", _exp_Invoice.CompanyNameBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressBilling", _exp_Invoice.AddressBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameDelivery", _exp_Invoice.CompanyNameDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressDelivery", _exp_Invoice.AddressDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsSubmit", _exp_Invoice.IsSubmit, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsAmendment", _exp_Invoice.IsAmendment, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsCPT", _exp_Invoice.IsCPT, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CPTCost", _exp_Invoice.CPTCost, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmount", _exp_Invoice.TotalAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@DocRefId", _exp_Invoice.DocRefId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TermsAndCondition", _exp_Invoice.TermsAndCondition, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_Invoice.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_Invoice.UpdatedDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PaymentProcessTypeId", _exp_Invoice.PaymentProcessTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "exp_Invoice_Post",
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

        public long AddDetail(exp_InvoiceDetail _exp_InvoiceDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[29]
                {
                    new Parameters("@InvoiceId", _exp_InvoiceDetail.InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _exp_InvoiceDetail.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderDetailId", _exp_InvoiceDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _exp_InvoiceDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _exp_InvoiceDetail.MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@OrderUnitId", _exp_InvoiceDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@HsCodeId", _exp_InvoiceDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Quantity", _exp_InvoiceDetail.Quantity, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPrice", _exp_InvoiceDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionOne", _exp_InvoiceDetail.DescriptionOne, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionTwo", _exp_InvoiceDetail.DescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _exp_InvoiceDetail.Amount, DbType.Decimal, ParameterDirection.Input),

                    new Parameters("@UnitId", _exp_InvoiceDetail.UnitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PackageId", _exp_InvoiceDetail.PackageId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitPerPackage", _exp_InvoiceDetail.UnitPerPackage, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ContainerId", _exp_InvoiceDetail.ContainerId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PackagePerContainer", _exp_InvoiceDetail.PackagePerContainer, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight", _exp_InvoiceDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ContainerWeight", _exp_InvoiceDetail.ContainerWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ContainerSize", _exp_InvoiceDetail.ContainerSize, DbType.String,
                        ParameterDirection.Input),
                    //////////////New added
                    new Parameters("@PcPerRoll", _exp_InvoiceDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollPerCarton", _exp_InvoiceDetail.RollPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", _exp_InvoiceDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollWeight", _exp_InvoiceDetail.RollWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonWeight", _exp_InvoiceDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonSize", _exp_InvoiceDetail.CartonSize, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _exp_InvoiceDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _exp_InvoiceDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _exp_InvoiceDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_InvoiceDetail_Create",
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

        public int Update(exp_Invoice _exp_Invoice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@InvoiceId", _exp_Invoice.InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PINoPostfix", _exp_Invoice.PINoPostfix, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceNo", _exp_Invoice.InvoiceNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceType", _exp_Invoice.InvoiceType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExporterBankId", _exp_Invoice.ExporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankId", _exp_Invoice.ImporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PlaceOfLoading", _exp_Invoice.PlaceOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FindDestination", _exp_Invoice.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TypeOfCarrier", _exp_Invoice.TypeOfCarrier, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionOfGoods", _exp_Invoice.DescriptionOfGoods, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactNo", _exp_Invoice.MasterContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactDate", _exp_Invoice.MasterContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameBilling", _exp_Invoice.CompanyNameBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressBilling", _exp_Invoice.AddressBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameDelivery", _exp_Invoice.CompanyNameDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressDelivery", _exp_Invoice.AddressDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderIds", _exp_Invoice.SalesOrderIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceDate", _exp_Invoice.InvoiceDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_Invoice.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_Invoice.UpdatedDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Invoice_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long invoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Invoice_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InvoiceDetailDeleteByInvoiceId(long invoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_InvoiceDetail_DeleteByInvoiceId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddInvoiceDetailModifiedData(exp_InvoiceDetail_ModifiedData _exp_InvoiceDetail_ModifiedData)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@Id", _exp_InvoiceDetail_ModifiedData.Id, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InvoiceId", _exp_InvoiceDetail_ModifiedData.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ColName", _exp_InvoiceDetail_ModifiedData.ColName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ColValue", _exp_InvoiceDetail_ModifiedData.ColValue, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_InvoiceDetail_ModifiedData_Post", colparameters, true);
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

        public List<exp_InvoiceDetail_ModifiedData> GetInvoiceDetailModifiedData(int? invoiceId = null)
        {
            try
            {
                var exp_InvoiceDetail_ModifiedDataList = new List<exp_InvoiceDetail_ModifiedData>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_InvoiceDetail_ModifiedDataList =
                    dbExecutor.FetchData<exp_InvoiceDetail_ModifiedData>(CommandType.StoredProcedure,
                        "exp_InvoiceDetail_ModifiedData_Get", colparameters);
                return exp_InvoiceDetail_ModifiedDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddInvoiceDetailTableHtml(exp_InvoiceDetail_TableHtml _exp_InvoiceDetail_TableHtml)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@Id", _exp_InvoiceDetail_TableHtml.Id, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InvoiceId", _exp_InvoiceDetail_TableHtml.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@HtmlData", _exp_InvoiceDetail_TableHtml.HtmlData, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_InvoiceDetail_TableHtml_Post",
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

        public List<exp_InvoiceDetail_TableHtml> GetInvoiceDetailTableHtml(int? invoiceId = null)
        {
            try
            {
                var exp_InvoiceDetail_TableHtmlList = new List<exp_InvoiceDetail_TableHtml>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_InvoiceDetail_TableHtmlList =
                    dbExecutor.FetchData<exp_InvoiceDetail_TableHtml>(CommandType.StoredProcedure,
                        "exp_InvoiceDetail_TableHtml_Get", colparameters);
                return exp_InvoiceDetail_TableHtmlList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Invoice detail modified data delete
        public int DeleteInvoiceDetailModifiedData(long invoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_InvoiceDetail_ModifiedData_Delete",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList GetInvoiceDetailModifiedDataForUpdate(long invoiceId)
        {
            var finalList = new ArrayList();
            try
            {
                IList myList = new ArrayList();
                var dataTable = new DataTable();

                var cmdText = $"exp_InvoiceDetail_ModifiedData_GetForPiUpdate {invoiceId}";

                dataTable = dbExecutor.GetDataTable(CommandType.Text, cmdText, true);


                myList = dataTable.AsEnumerable().Select(
                    row => dataTable.Columns.Cast<DataColumn>().ToDictionary(
                        column => column.ColumnName,
                        column => row[column].ToString()
                    )).ToList();


                return myList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}