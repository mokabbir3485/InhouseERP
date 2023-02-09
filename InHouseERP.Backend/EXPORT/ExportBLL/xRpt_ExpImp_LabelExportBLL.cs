using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class xRpt_ExpImp_LabelExportBLL
    {
        public xRpt_ExpImp_LabelExportBLL()
        {
            //exp_ApprovalDAO = exp_Approval.GetInstanceThreadSafe;
            exp_ExportImportReportsDAO = new exp_ExportImportReportsDAO();
        }

        public exp_ExportImportReportsDAO exp_ExportImportReportsDAO { get; set; }

        public List<xRpt_ExpImp_LabelExport> GetExpImpLabelExport(DateTime FromDate, DateTime ToDate,
            string CategoryType)
        {
            try
            {
                return exp_ExportImportReportsDAO.GetExpImpLabelExport(FromDate, ToDate, CategoryType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xRpt_ExpImp_ImportExportBalance> GetImportExportBalanceReport(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                return exp_ExportImportReportsDAO.GetImportExportBalanceReport(FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xRpt_expimp_TotalRawMaterialAndMachineryStatus> GetImportReport(DateTime FromDate, DateTime ToDate,
            string CategoryType)
        {
            try
            {
                return exp_ExportImportReportsDAO.GetImportReport(FromDate, ToDate, CategoryType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}