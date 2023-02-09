using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_ExportReportsBLL //: IDisposible
    {
        public exp_ExportReportsBLL()
        {
            //exp_ApprovalDAO = exp_Approval.GetInstanceThreadSafe;
            ExpExpReportsDAO = new exp_ExpReportsDAO();
        }

        public exp_ExpReportsDAO ExpExpReportsDAO { get; set; }

        public List<exp_ExportReports> LoadCI()
        {
            try
            {
                return ExpExpReportsDAO.LoadCI();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Pi html report
        public List<xRpt_exp_PI_Master> GetPiMasterForReport(long invoiceId)
        {
            try
            {
                return ExpExpReportsDAO.GetPiMasterForReport(invoiceId);
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
                return ExpExpReportsDAO.GetCiMasterForReport(commercialInvoiceId);
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
                return ExpExpReportsDAO.GetPiDetailForReport(invoiceId);
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
                return ExpExpReportsDAO.GetCIInfoDetailReport(commercialInvoiceId);
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
                return ExpExpReportsDAO.GetBankDocForReport(commercialInvoiceId);
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
                return ExpExpReportsDAO.GetBillOfExchangeForReport(commercialInvoiceId, DocType);
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
                return ExpExpReportsDAO.GetConsumptionCertificateReport(commercialInvoiceId);
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
                return ExpExpReportsDAO.GetConsumptionCertificateDescriptionReport(commercialInvoiceId);
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
                return ExpExpReportsDAO.GetConsumptionCertificateRawMaterialsReport(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ExportReports> GetForCertificateOfOrigin(long CommercialInvoiceId, string CertificateType)
        {
            try
            {
                return ExpExpReportsDAO.GetCertificateOfOrigin(CommercialInvoiceId, CertificateType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ExportReports> GetDeliveryChalanGetReport(long CommercialInvoiceId)
        {
            try
            {
                return ExpExpReportsDAO.GetDeliveryChalanGetReport(CommercialInvoiceId);
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
                return ExpExpReportsDAO.GetDeliveryChalanGetReportDetails(CommercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}