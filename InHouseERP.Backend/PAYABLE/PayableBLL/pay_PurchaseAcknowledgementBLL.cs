using System;
using System.Collections.Generic;
using PayableDAL;
using PayableEntity;

namespace PayableBLL
{
    public class pay_PurchaseAcknowledgementBLL
    {
        public pay_PurchaseAcknowledgementBLL()
        {
            //pay_SaleRealizationDAO = pay_SaleRealization.GetInstanceThreadSafe;
            pay_PurchaseAcknowledgementDAO = new pay_PurchaseAcknowledgementDAO();
        }

        public pay_PurchaseAcknowledgementDAO pay_PurchaseAcknowledgementDAO { get; set; }
        public int AcknowledgeCreate(pay_PurchaseAcknowledgement pay_PurchaseAcknowledgement)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.AcknowledgeCreate(pay_PurchaseAcknowledgement);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int SupplierAitDetailCreate(pay_PurchaseAcknowledgement pay_PurchaseAcknowledgement)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.SupplierAitDetailCreate(pay_PurchaseAcknowledgement);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int SupplierAitCreate(pay_SupplierAIT pay_SupplierAit)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.SupplierAitCreate(pay_SupplierAit);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_PurchaseAcknowledgement> GetPurchaseAcknowledgement(long SupplierId)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetPurchaseAcknowledgement(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PurchaseAcknowledgement> GetSupplierPayment_GetBySupplierIdForAIT(string SupplierId)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetSupplierPayment_GetBySupplierIdForAIT(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_xrpt_TDSIssue> GetVat_TDS_GetByTDSIssueId(int TDSIssueId)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetVat_TDS_GetByTDSIssueId(TDSIssueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PurchaseAcknowledgement> GetMaxAcknowledgementNo()
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetMaxAcknowledgementNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetTDSIssueNo()
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetTDSIssueNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PurchaseAcknowledgement> GetPagedAcknowledge(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetPagedAcknowledge(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_SupplierAIT> GetTDSIssuePaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pay_PurchaseAcknowledgementDAO.GetTDSIssuePaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
    
}
