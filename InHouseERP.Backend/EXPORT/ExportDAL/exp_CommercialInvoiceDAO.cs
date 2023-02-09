using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_CommercialInvoiceDAO //: IDisposible
    {
        private static volatile exp_CommercialInvoiceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_CommercialInvoiceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_CommercialInvoiceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_CommercialInvoiceDAO();
                    }

                return instance;
            }
        }

        public static exp_CommercialInvoiceDAO GetInstance()
        {
            if (instance == null) instance = new exp_CommercialInvoiceDAO();
            return instance;
        }

        public List<exp_CommercialInvoice> GetPaymentProcessTypeAll(int? PaymentProcessTypeId = null)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentProcessTypeId", PaymentProcessTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchData<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_PaymentProcessType_Get", colparameters);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetAll(long? commercialInvoiceId = null)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int32, ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchData<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_CommercialInvoice_Get", colparameters);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchData<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_CommercialInvoice_GetDynamic", colparameters);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchDataRef<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_CommercialInvoice_GetPaged", colparameters, ref rows);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@CommercialInvoiceNo", _exp_CommercialInvoice.CommercialInvoiceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceDate", _exp_CommercialInvoice.CommercialInvoiceDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PaymentProcessType", _exp_CommercialInvoice.PaymentProcessType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LcScNo", _exp_CommercialInvoice.LcScNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LcScDate", _exp_CommercialInvoice.LcScDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankId", _exp_CommercialInvoice.ImporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceIds", _exp_CommercialInvoice.InvoiceIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExpNo", _exp_CommercialInvoice.ExpNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExpDate", _exp_CommercialInvoice.ExpDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ShipmentMode", _exp_CommercialInvoice.ShipmentMode, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Covering", _exp_CommercialInvoice.Covering, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CountryOfOrigin", _exp_CommercialInvoice.CountryOfOrigin, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DcGateNo", _exp_CommercialInvoice.DcGateNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VehicleRegNo", _exp_CommercialInvoice.VehicleRegNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactNo", _exp_CommercialInvoice.MasterContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactDate", _exp_CommercialInvoice.MasterContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@TermsOfPayment", _exp_CommercialInvoice.TermsOfPayment, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsSubmitted", _exp_CommercialInvoice.IsSubmitted, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_CommercialInvoice.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_CommercialInvoice.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_CommercialInvoice_Create",
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

        public int DeliveryChallanPost(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DeliveryChallanId", _exp_CommercialInvoice.DeliveryChallanId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoice.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DcGateNo", _exp_CommercialInvoice.DcGateNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VehicleRegNo", _exp_CommercialInvoice.VehicleRegNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_CommercialInvoice.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_CommercialInvoice.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_DeliveryChallan_Post", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> DeliveryChallanGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchDataRef<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "exp_DeliveryChallan_GetPaged", colparameters, ref rows);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[39]
                {
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoice.CommercialInvoiceId, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceNo", _exp_CommercialInvoice.CommercialInvoiceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceDate", _exp_CommercialInvoice.CommercialInvoiceDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PaymentProcessType", _exp_CommercialInvoice.PaymentProcessType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LcScNo", _exp_CommercialInvoice.LcScNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LcScDate", _exp_CommercialInvoice.LcScDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankId", _exp_CommercialInvoice.ImporterBankId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ExporterBankAccountId", _exp_CommercialInvoice.ExporterBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ExporterId", _exp_CommercialInvoice.ExporterId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentProcessTypeId", _exp_CommercialInvoice.PaymentProcessTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceIds", _exp_CommercialInvoice.InvoiceIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExpNo", _exp_CommercialInvoice.ExpNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExpDate", _exp_CommercialInvoice.ExpDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ShipmentMode", _exp_CommercialInvoice.ShipmentMode, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Covering", _exp_CommercialInvoice.Covering, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CountryOfOrigin", _exp_CommercialInvoice.CountryOfOrigin, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DcGateNo", _exp_CommercialInvoice.DcGateNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VehicleRegNo", _exp_CommercialInvoice.VehicleRegNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactNo", _exp_CommercialInvoice.MasterContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MasterContactDate", _exp_CommercialInvoice.MasterContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@TermsOfPayment", _exp_CommercialInvoice.TermsOfPayment, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsSubmitted", _exp_CommercialInvoice.IsSubmitted, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsAmendment", _exp_CommercialInvoice.IsAmendment, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsCPT", _exp_CommercialInvoice.IsCPT, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CPTCost", _exp_CommercialInvoice.CPTCost, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAmount", _exp_CommercialInvoice.TotalAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_CommercialInvoice.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_CommercialInvoice.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameBilling", _exp_CommercialInvoice.CompanyNameBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressBilling", _exp_CommercialInvoice.AddressBilling, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyNameDelivery", _exp_CommercialInvoice.CompanyNameDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressDelivery", _exp_CommercialInvoice.AddressDelivery, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@ExporterInfo", _exp_CommercialInvoice.ExporterInfo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExporterBankInfo", _exp_CommercialInvoice.ExporterBankInfo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PiRefNo", _exp_CommercialInvoice.PiRefNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PiRefDate", _exp_CommercialInvoice.PiRefDate, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HsCode", _exp_CommercialInvoice.HsCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@ImporterBankBin", _exp_CommercialInvoice.ImporterBankBin, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ImporterBankAddress", _exp_CommercialInvoice.ImporterBankAddress, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_CommercialInvoice_Post",
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

        public long AddDetail(exp_CommercialInvoiceDetail _exp_CommercialInvoiceDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[21]
                {
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoiceDetail.CommercialInvoiceId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InvoiceId", _exp_CommercialInvoiceDetail.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceDetailId", _exp_CommercialInvoiceDetail.InvoiceDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _exp_CommercialInvoiceDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _exp_CommercialInvoiceDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OrderUnitId", _exp_CommercialInvoiceDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@HsCodeId", _exp_CommercialInvoiceDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DescriptionOne", _exp_CommercialInvoiceDetail.DescriptionOne, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsDescriptionOverride", _exp_CommercialInvoiceDetail.IsDescriptionOverride,
                        DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@Quantity", _exp_CommercialInvoiceDetail.Quantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", _exp_CommercialInvoiceDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _exp_CommercialInvoiceDetail.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _exp_CommercialInvoiceDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _exp_CommercialInvoiceDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _exp_CommercialInvoiceDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PcPerRoll", _exp_CommercialInvoiceDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollPerCarton", _exp_CommercialInvoiceDetail.RollPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", _exp_CommercialInvoiceDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollWeight", _exp_CommercialInvoiceDetail.RollWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonWeight", _exp_CommercialInvoiceDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonSize", _exp_CommercialInvoiceDetail.CartonSize, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_CommercialInvoiceDetail_Create", colparameters, true);
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

        public List<exp_CommercialInvoiceDetail> CommercialInvoiceDetailGetByCommercialInvoiceId(long invoice)
        {
            try
            {
                var commercialInvoiceDtlList = new List<exp_CommercialInvoiceDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", invoice, DbType.Int64, ParameterDirection.Input)
                };
                commercialInvoiceDtlList = dbExecutor.FetchData<exp_CommercialInvoiceDetail>(
                    CommandType.StoredProcedure, "exp_CommercialInvoiceDetail_GetByCommercialInvoiceId", colparameters);
                return commercialInvoiceDtlList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long commercialInvoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_CommercialInvoice_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateChallanGate(exp_CommercialInvoice _exp_CommercialInvoice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoice.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DcGateNo", _exp_CommercialInvoice.DcGateNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VehicleRegNo", _exp_CommercialInvoice.VehicleRegNo, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_CommercialInvoice_UpdateChallanGate",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Item> GetItemByCI(long ciId)
        {
            try
            {
                var list = new List<exp_Item>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", ciId, DbType.Int64, ParameterDirection.Input)
                };
                list =
                    dbExecutor.FetchData<exp_Item>(CommandType.StoredProcedure, "exp_GetItemByCI",
                        colparameters);
                return list;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int CommercialInvoiceDetailDeleteByCommercialInvoiceId(long commercialInvoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_CommercialInvoiceDetail_DeleteByCommercialInvoiceId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //rakinCiTable SP
        public long AddCommercialInvoiceDetailModifiedData(
            exp_CommercialInvoiceDetail_ModifiedData _exp_CommercialInvoiceDetail_ModifiedData)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@Id", _exp_CommercialInvoiceDetail_ModifiedData.Id, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RowNo", _exp_CommercialInvoiceDetail_ModifiedData.RowNo, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId",
                        _exp_CommercialInvoiceDetail_ModifiedData.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ColName", _exp_CommercialInvoiceDetail_ModifiedData.ColName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ColValue", _exp_CommercialInvoiceDetail_ModifiedData.ColValue, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_CommercialInvoiceDetail_ModifiedData_Post", colparameters, true);
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

        public List<exp_CommercialInvoiceDetail_ModifiedData> GetCommercialInvoiceDetailModifiedData(
            int? commercialInvoiceId = null)
        {
            try
            {
                var exp_CommercialInvoiceDetail_ModifiedDataList = new List<exp_CommercialInvoiceDetail_ModifiedData>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceDetail_ModifiedDataList =
                    dbExecutor.FetchData<exp_CommercialInvoiceDetail_ModifiedData>(CommandType.StoredProcedure,
                        "exp_CommercialInvoiceDetail_ModifiedData_Get", colparameters);
                return exp_CommercialInvoiceDetail_ModifiedDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_HTMLTableForReport> GetHTMLTableForReport(long DocumentId, string DocType)
        {
            try
            {
                var exp_HTMLTableForReportList = new List<exp_HTMLTableForReport>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DocumentId", DocumentId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DocType", DocType, DbType.String, ParameterDirection.Input)
                };
                exp_HTMLTableForReportList = dbExecutor.FetchData<exp_HTMLTableForReport>(CommandType.StoredProcedure,
                    "exp_HTMLTableForReport_Get", colparameters);
                return exp_HTMLTableForReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostHTMLTableForReport(exp_HTMLTableForReport _exp_HTMLTableForReport)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@Id", _exp_HTMLTableForReport.Id, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DocumentId", _exp_HTMLTableForReport.DocumentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@HtmlData", _exp_HTMLTableForReport.HtmlData, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DocType", _exp_HTMLTableForReport.DocType, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_HTMLTableForReport_Post",
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

        public long AddCommercialInvoiceDetailTableHtml(
            exp_CommercialInvoiceDetail_TableHtml _exp_CommercialInvoiceDetail_TableHtml)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@Id", _exp_CommercialInvoiceDetail_TableHtml.Id, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoiceDetail_TableHtml.CommercialInvoiceId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@HtmlData", _exp_CommercialInvoiceDetail_TableHtml.HtmlData, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "exp_CommercialInvoiceDetail_TableHtml_Post", colparameters, true);
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

        public List<exp_CommercialInvoiceDetail_TableHtml> GetCommercialInvoiceDetailTableHtml(
            int? commercialInvoiceId = null)
        {
            try
            {
                var exp_CommercialInvoiceDetail_TableHtmlList = new List<exp_CommercialInvoiceDetail_TableHtml>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceDetail_TableHtmlList =
                    dbExecutor.FetchData<exp_CommercialInvoiceDetail_TableHtml>(CommandType.StoredProcedure,
                        "exp_CommercialInvoiceDetail_TableHtml_Get", colparameters);
                return exp_CommercialInvoiceDetail_TableHtmlList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList GetCommercialInvoiceDetailModifiedDataGetByInvoiceId(long invoiceId)
        {
            var finalList = new ArrayList();
            try
            {
                IList myList = new ArrayList();
                var dataTable = new DataTable();

                var cmdText = $"exp_CommercialInvoiceDetail_ModifiedData_GetByInvoiceId {invoiceId}";

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

        public IList GetCommercialInvoiceDetailModifiedDataForCiUpdate(long commercialInvoiceId)
        {
            var finalList = new ArrayList();
            try
            {
                IList myList = new ArrayList();
                var dataTable = new DataTable();

                var cmdText = $"exp_CommercialInvoiceDetail_ModifiedData_GetForCiUpdate {commercialInvoiceId}";

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

        public int DeleteCommercialInvoiceDetailModifiedData(long commercialInvoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_CommercialInvoiceDetail_ModifiedData_Delete", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}