using System;
using System.Collections.Generic;
using ReceivableDAL;
using ReceivableEntity;

namespace ReceivableBLL
{
    public class rcv_CompanyVatAitBLL
    {
        public rcv_CompanyVatAitBLL()
        {
            rcv_CompanyVatAitDAO = new rcv_CompanyVatAitDAO();
        }

        public rcv_CompanyVatAitDAO rcv_CompanyVatAitDAO { get; set; }

        public List<rcv_CompanyVatAit> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyVatAitDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaxCompanyVatIssueNo()
        {
            try
            {
                return rcv_CompanyVatAitDAO.GetMaxCompanyVatIssueNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyVAT> GetCompanyPayment_GetByCompanyIdForCompanyVATIssue(string CompanyIds)
        {
            try
            {
                return rcv_CompanyVatAitDAO.GetCompanyPayment_GetByCompanyIdForCompanyVATIssue(CompanyIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Add(rcv_CompanyVAT rcv_CompanyVAT)
        {
            try
            {
                return rcv_CompanyVatAitDAO.Add(rcv_CompanyVAT);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int AddDetails(rcv_CompanyVAT rcv_CompanyVAT)
        {
            try
            {
                return rcv_CompanyVatAitDAO.AddDetails(rcv_CompanyVAT);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long Post(rcv_CompanyVatAit rcv_CompanyVatAit)
        {
            try
            {
                return rcv_CompanyVatAitDAO.Post(rcv_CompanyVatAit);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyVAT> VATCompanyGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyVatAitDAO.VATCompanyGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyVAT> GetCompanyVAT_GetByTrChallanId(Int32 TrChallanId)
        {
            try
            {
                return rcv_CompanyVatAitDAO.GetCompanyVAT_GetByTrChallanId(TrChallanId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
