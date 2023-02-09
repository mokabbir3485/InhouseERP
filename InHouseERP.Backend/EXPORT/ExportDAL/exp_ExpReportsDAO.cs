using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ExpReportsDAO //: IDisposible
    {
        private static volatile exp_ExpReportsDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ExpReportsDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ExpReportsDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ExpReportsDAO();
                    }

                return instance;
            }
        }

        public static exp_ExpReportsDAO GetInstance()
        {
            if (instance == null) instance = new exp_ExpReportsDAO();
            return instance;
        }

        public List<exp_ExportReports> LoadCI()
        {
            try
            {
                var exp_ExportReportsList = new List<exp_ExportReports>();
                exp_ExportReportsList =
                    dbExecutor.FetchData<exp_ExportReports>(CommandType.StoredProcedure, "xRpt_loadCI");
                return exp_ExportReportsList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //PI html report
        public List<xRpt_exp_PI_Master> GetPiMasterForReport(long invoiceId)
        {
            try
            {
                var exp_InvoiceLst = new List<xRpt_exp_PI_Master>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_InvoiceLst = dbExecutor.FetchData<xRpt_exp_PI_Master>(CommandType.StoredProcedure,
                    "xRpt_exp_PI_Master", colparameters);
                return exp_InvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_exp_CI_Master> GetCiMasterForReport(long commercialInvoiceId)
        {
            try
            {
                var exp_CommercialInvoiceLst = new List<xRpt_exp_CI_Master>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceLst = dbExecutor.FetchData<xRpt_exp_CI_Master>(CommandType.StoredProcedure,
                    "xRpt_exp_CI_Master", colparameters);
                return exp_CommercialInvoiceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_exp_CI_Info_Detail> GetCIInfoDetailReport(long commercialInvoiceId)
        {
            try
            {
                var exp_CommercialInvoiceInfoDetailList = new List<xRpt_exp_CI_Info_Detail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceInfoDetailList =
                    dbExecutor.FetchData<xRpt_exp_CI_Info_Detail>(CommandType.StoredProcedure,
                        "xRpt_exp_CI_Info_Detail", colparameters);
                return exp_CommercialInvoiceInfoDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_exp_PI_Detail> GetPiDetailForReport(long invoiceId)
        {
            try
            {
                var exp_InvoiceDetailList = new List<xRpt_exp_PI_Detail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InvoiceId", invoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_InvoiceDetailList = dbExecutor.FetchData<xRpt_exp_PI_Detail>(CommandType.StoredProcedure,
                    "xRpt_exp_PI_Detail", colparameters);
                return exp_InvoiceDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> GetBankDocForReport(long commercialInvoiceId)
        {
            try
            {
                var exp_BankDocument = new List<exp_BankDocument>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_BankDocument = dbExecutor.FetchData<exp_BankDocument>(CommandType.StoredProcedure,
                    "xRpt_exp_BankDocument", colparameters);
                return exp_BankDocument;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> GetBillOfExchangeForReport(long commercialInvoiceId, string DocType)
        {
            try
            {
                var exp_CommercialInvoice = new List<exp_CommercialInvoice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DocType", DocType, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoice = dbExecutor.FetchData<exp_CommercialInvoice>(CommandType.StoredProcedure,
                    "xRpt_exp_BillOfExchange", colparameters);
                return exp_CommercialInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_exp_ConsumptionCertificate> GetConsumptionCertificateReport(long commercialInvoiceId)
        {
            try
            {
                var exp_CommercialInvoiceConsumptionCertificates = new List<xRpt_exp_ConsumptionCertificate>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceConsumptionCertificates =
                    dbExecutor.FetchData<xRpt_exp_ConsumptionCertificate>(CommandType.StoredProcedure,
                        "xRpt_exp_ConsumptionCertificate", colparameters);
                return exp_CommercialInvoiceConsumptionCertificates;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> GetConsumptionCertificateDescriptionReport(
            long commercialInvoiceId)
        {
            try
            {
                var exp_ConsumptionCertificateDescription = new List<exp_ConsumptionCertificateDescription>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateDescription = dbExecutor.FetchData<exp_ConsumptionCertificateDescription>(
                    CommandType.StoredProcedure, "xRpt_exp_ConsumptionCertificateDescription", colparameters);
                return exp_ConsumptionCertificateDescription;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetConsumptionCertificateRawMaterialsReport(
            long commercialInvoiceId)
        {
            try
            {
                var exp_ConsumptionCertificateRawMaterials = new List<exp_ConsumptionCertificateRawMaterials>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_ConsumptionCertificateRawMaterials = dbExecutor.FetchData<exp_ConsumptionCertificateRawMaterials>(
                    CommandType.StoredProcedure, "xRpt_exp_ConsumptionCertificateRawMaterials", colparameters);
                return exp_ConsumptionCertificateRawMaterials;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<exp_ExportReports> GetCertificateOfOrigin(long CommercialInvoiceId, string CertificateType)
        {
            var exp_ExportReportsList = new List<exp_ExportReports>();
            var colparameters = new Parameters[2]
            {
                new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input),
                new Parameters("@CertificateType", CertificateType, DbType.String, ParameterDirection.Input)
            };
            exp_ExportReportsList = dbExecutor.FetchData<exp_ExportReports>(CommandType.StoredProcedure,
                "xRpt_exp_CertificateOfOriginOrPreInspection", colparameters);
            return exp_ExportReportsList;
        }

        public List<exp_ExportReports> GetDeliveryChalanGetReport(long CommercialInvoiceId)
        {
            try
            {
                var chalan2Report = new List<exp_ExportReports>();
                var colsprameter = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };

                chalan2Report = dbExecutor.FetchData<exp_ExportReports>(CommandType.StoredProcedure,
                    "xRpt_exp_DeliveryChallan", colsprameter);
                return chalan2Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<exp_ExportReports> GetDeliveryChalanGetReportDetails(long CommercialInvoiceId)
        {
            try
            {
                var chalan2Report = new List<exp_ExportReports>();
                var colsprameter = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };

                chalan2Report = dbExecutor.FetchData<exp_ExportReports>(CommandType.StoredProcedure,
                    "xRpt_exp_DeliveryChallan_Details", colsprameter);
                return chalan2Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}