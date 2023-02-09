using DbExecutor;
using PosEntity;
using SecurityEntity.POS.PosEntity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace PosDAL
{
    public class pos_SalesOrderDAO //: IDisposable
    {
        private static volatile pos_SalesOrderDAO instance;
        private static readonly object lockObj = new object();
        public static pos_SalesOrderDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new pos_SalesOrderDAO();
            }
            return instance;
        }
        public static pos_SalesOrderDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new pos_SalesOrderDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public pos_SalesOrderDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<pos_SalesOrder> GetCIFDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_CIFDashboard_GetSalesOrderByCompanyId", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrder> GetSalesOrderForDeliveryByCommercialInvoiceId(Int64 CommercialInvoiceId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_GetSalesOrderForDeliveryByCommercialInvoiceId", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> CIFDashboard_GetSalesOrderDetailBySalesOrderId(Int64 SalesOrderId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                    new Parameters("@SalesOrderId", SalesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_CIFDashboard_GetSalesOrderDetailBySalesOrderId", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> GetAll(Int64? salesOrderId = null)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                new Parameters("@SalesOrderId", salesOrderId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_Get", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> GetAllCurrency(Int32? CurrencyId = null)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                new Parameters("@CurrencyId", CurrencyId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "ad_Currency_Get", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesRegister> CompanyPaymentStatusReport(string FilterType,string SalesOrderType, string CompanyId, DateTime? FromDate = null, DateTime? ToDate = null, int? SectionId = null, int? EmployeeId = null, int? BranchId = null)
        {
            try
            {
                List<pos_SalesRegister> pos_CompanyPaymentStatusLst = new List<pos_SalesRegister>();
                Parameters[] colparameters = new Parameters[8]{
                new Parameters("@FilterType", FilterType, DbType.String, ParameterDirection.Input),
                new Parameters("@SalesOrderType", SalesOrderType, DbType.String, ParameterDirection.Input),
                new Parameters("@CompanyId", CompanyId, DbType.String, ParameterDirection.Input),
                new Parameters("@fromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@toDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@SectionId", SectionId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@EmployeeId", EmployeeId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@BranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                pos_CompanyPaymentStatusLst = dbExecutor.FetchData<pos_SalesRegister>(CommandType.StoredProcedure, "xRpt_pos_CompanyPaymentStatus", colparameters);
                return pos_CompanyPaymentStatusLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[2]{
                new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetDynamic", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pos_SalesOrder> GetForPiUpdate(Int64 InvoiceId, Int32 CompanyId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@InvoiceId", InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetForPIUpdate", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesRegister> SalesRegisterReport(string SalesOrderType, string companyId, DateTime? FormDate = null, DateTime? ToDate = null, int? sectionId = null, int? EmployeeId = null, int? BranchId = null)
        {
            try
            {
                List<pos_SalesRegister> pos_SalesOrderLst = new List<pos_SalesRegister>();
                Parameters[] colparameters = new Parameters[7]{
                    new Parameters("@fromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate",ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@SalesOrderType",SalesOrderType, DbType.String, ParameterDirection.Input),
                    new Parameters("@SectionId",sectionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId",EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyId",companyId, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchId",BranchId, DbType.Int32, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesRegister>(CommandType.StoredProcedure, "xRpt_pos_SalesRegisterReport", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> EPZExportSalesReport(string companyId, DateTime? FormDate = null, DateTime? ToDate = null, int? sectionId = null, int? EmployeeId = null, decimal? ConversionRate = null)
        {
            try
            {
                List<pos_SalesOrder> EPZExportSalesLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[6]{
                    new Parameters("@fromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate",ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@SectionId",sectionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId",EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyId",companyId, DbType.String, ParameterDirection.Input),
                    new Parameters("@ConversionRate",ConversionRate, DbType.Decimal, ParameterDirection.Input)
                };
                EPZExportSalesLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "xRpt_pos_ExportSalesReport", colparameters);
                return EPZExportSalesLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public List<SalesTestReport> SalesTestReport()
        //{
        //    try
        //    {
        //        List<SalesTestReport> pos_SalesOrderLst = new List<SalesTestReport>();
        //        //Parameters[] colparameters = new Parameters[3]{
        //        //    new Parameters("@fromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
        //        //    new Parameters("@toDate",ToDate, DbType.DateTime, ParameterDirection.Input),
        //        //    new Parameters("@SalesOrderType",SalesOrderType, DbType.String, ParameterDirection.Input),
        //        //};
        //        pos_SalesOrderLst = dbExecutor.FetchData<SalesTestReport>(CommandType.StoredProcedure, "Productivity_test", null);
        //        return pos_SalesOrderLst;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public IList SalesProductivityReport()
        {
            var finalList = new ArrayList();
            try
            {
                IList myList = new ArrayList();
                var dataTable = new DataTable();

                var cmdText = $"xRpt_pos_SalesProductivityReport";

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
        public List<pos_SalesOrder> pos_SalesOrderAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderList = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[2]{
                new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input),
                };
                pos_SalesOrderList = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrderAmendment_GetForEdit", colparameters);
                return pos_SalesOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrder> pos_SalesOrder_GetForEdit(DateTime fromDate, DateTime toDate, int? companyId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", fromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", toDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetForEdit", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_SalesOrder> pos_SalesOrder_GetForPI(int companyId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetForPI", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[5]{
                new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input),
                };
                pos_SalesOrderLst = dbExecutor.FetchDataRef<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetPaged", colparameters, ref rows);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public string Add(pos_SalesOrder _pos_SalesOrder)
        public string Add(pos_SalesOrder _pos_SalesOrder)
        {
            string ret = "";
            try
            {
                Common aCommon = new Common();

                //SO/17-18/1, SO/17-18/2, SO/17-18/3, SO/17-18/100, SO/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_pos_SalesOrder.SalesOrderDate);
                //_pos_SalesOrder.SalesOrderNo = "SO/" + aFiscalYearPart + "/" + _pos_SalesOrder.SalesOrderNo;

                Parameters[] colparameters = new Parameters[22]{
                new Parameters("@SalesOrderId", _pos_SalesOrder.SalesOrderId, DbType.Int64, ParameterDirection.Input),
                new Parameters("@CompanyId", _pos_SalesOrder.CompanyId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@FactoryId", _pos_SalesOrder.FactoryId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@PriceTypeId", _pos_SalesOrder.PriceTypeId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@SalesOrderNo", _pos_SalesOrder.SalesOrderNo, DbType.String, ParameterDirection.Input),
                //new Parameters("@ReferenceNo", _pos_SalesOrder.ReferenceNo, DbType.String, ParameterDirection.Input),
                new Parameters("@SalesOrderDate", _pos_SalesOrder.SalesOrderDate, DbType.DateTime, ParameterDirection.Input),
                //new Parameters("@InvoiceDueDate", _pos_SalesOrder.InvoiceDueDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@DeliveryDate", _pos_SalesOrder.DeliveryDate, DbType.DateTime, ParameterDirection.Input),
                //new Parameters("@PODate", _pos_SalesOrder.PODate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@PreparedById", _pos_SalesOrder.PreparedById, DbType.Int32, ParameterDirection.Input),
                new Parameters("@Remarks", _pos_SalesOrder.Remarks, DbType.String, ParameterDirection.Input),
                new Parameters("@CreatorId", _pos_SalesOrder.CreatorId, DbType.Int32, ParameterDirection.Input),
                //new Parameters("@CreateDate", _pos_SalesOrder.CreateDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@UpdatorId", _pos_SalesOrder.UpdatorId, DbType.Int32, ParameterDirection.Input),
                //new Parameters("@UpdateDate", _pos_SalesOrder.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@CompanyNameBilling", _pos_SalesOrder.CompanyNameBilling, DbType.String, ParameterDirection.Input),
                new Parameters("@AddressBilling", _pos_SalesOrder.AddressBilling, DbType.String, ParameterDirection.Input),
                new Parameters("@CompanyNameDelivery", _pos_SalesOrder.CompanyNameDelivery, DbType.String, ParameterDirection.Input),
                new Parameters("@AddressDelivery", _pos_SalesOrder.AddressDelivery, DbType.String, ParameterDirection.Input),
                new Parameters("@CurrencyType", _pos_SalesOrder.CurrencyType, DbType.String, ParameterDirection.Input),
                new Parameters("@CurrencyId", _pos_SalesOrder.CurrencyId, DbType.String, ParameterDirection.Input),
                new Parameters("@ConversionRate", _pos_SalesOrder.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@CPTCost", _pos_SalesOrder.CPTCost, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@SalesOrderType", _pos_SalesOrder.SalesOrderType, DbType.String, ParameterDirection.Input),
                new Parameters("@IsAmendment", _pos_SalesOrder.IsAmendment, DbType.Boolean, ParameterDirection.Input),
                new Parameters("@IsCPT", _pos_SalesOrder.IsCPT, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "pos_SalesOrder_Post", colparameters, true);
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
        public int Acknowledge(pos_SalesOrder _pos_SalesOrder)
        {
            int ret = 0;
            try
            {
                Parameters[] colparameters = new Parameters[5]{
                new Parameters("@SalesOrderId", _pos_SalesOrder.SalesOrderId, DbType.Int64, ParameterDirection.Input),
                new Parameters("@IsAcknowledged", _pos_SalesOrder.IsAcknowledged, DbType.Boolean, ParameterDirection.Input),
                new Parameters("@AcknowledgedBy", _pos_SalesOrder.AcknowledgedBy, DbType.Int32, ParameterDirection.Input),
                new Parameters("@AcknowledgedDate", _pos_SalesOrder.AcknowledgedDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@VoucherNo", _pos_SalesOrder.VoucherNo, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrder_Acknowledge", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Delete(Int64 salesOrderId)
        {
            try
            {
                int ret = 0;
                Parameters[] colparameters = new Parameters[1]{
                new Parameters("@SalesOrderId", salesOrderId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_SalesOrder_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public DbDataReader GetMaxSalesOrderNo()
        //{
        //    try
        //    {

        //        DbDataReader SalesOrderNo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxSalesOrderNo");
        //        return SalesOrderNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public string GetMaxSalesOrderNo(DateTime salesOrderDate)
        //{
        //    try
        //    {
        //        //Common aCommon = new Common();
        //        //Parameters[] colparameters;
        //        //if (ExporterFactoryId == 1)
        //        //{
        //        //    DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(salesOrderDate);
        //        //    colparameters = new Parameters[2]{
        //        //        new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
        //        //        new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
        //        //    };

        //        //}
        //        //else
        //        //{
        //        //    DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForSreepur(salesOrderDate);
        //        //    colparameters = new Parameters[2]{
        //        //        new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
        //        //        new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
        //        //    };
        //        //}

        //        Common aCommon = new Common();
        //        DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDate(salesOrderDate);

        //        Parameters[] colparameters = new Parameters[2]{
        //            new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
        //            new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
        //        };

        //        Int64 maxSalesOrderNo = 0;
        //        string SalesOrderNo;
        //        dbExecutor.ManageTransaction(TransactionType.Open);
        //        maxSalesOrderNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "SELECT SalesOrderNo=CAST((ISNULL( MAX(CAST(SUBSTRING([SalesOrderNo],10,((LEN([SalesOrderNo])+1)-10)) AS BIGINT)),0)+1) AS VARCHAR(50))FROM [pos_SalesOrder] WITH (NOLOCK) WHERE[SalesOrderNo] IS NOT NULL AND LEN([SalesOrderNo])>=10 AND([SalesOrderDate] BETWEEN @fromDate AND @toDate)", colparameters, true);
        //        string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(salesOrderDate);
        //        SalesOrderNo = "SO/" + aFiscalYearPart + "/" + maxSalesOrderNo;
        //        dbExecutor.ManageTransaction(TransactionType.Commit);
        //        return SalesOrderNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }


        //}
        public Int64 GetMaxSalesOrderNo()
        {
            try
            {

                //Common aCommon = new Common();
                //DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDate(salesOrderDate);

                //Parameters[] colparameters = new Parameters[2]{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                Int64 maxSalesOrderNo = 0;
                //string SalesOrderNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxSalesOrderNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pos_GetMaxSalesOrderNo", null, true);
                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(salesOrderDate);
                //SalesOrderNo = "SO/" + aFiscalYearPart + "/" + maxSalesOrderNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxSalesOrderNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public List<pos_SalesOrder> GetTopForDelivery(int topQty)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[1]{
                new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "pos_SalesOrder_GetTopForDelivery", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_SalesOrder> GetForRealization(int financialCycleId, int companyId)
        {
            try
            {
                List<pos_SalesOrder> pos_SalesOrderLst = new List<pos_SalesOrder>();
                Parameters[] colparameters = new Parameters[2]{
                new Parameters("@FinancialCycleId", financialCycleId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<pos_SalesOrder>(CommandType.StoredProcedure, "rcv_GetSalesOrderForRealization", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
