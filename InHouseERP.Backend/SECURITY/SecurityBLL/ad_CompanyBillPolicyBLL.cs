using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_CompanyBillPolicyBLL //: IDisposible
    {
        public ad_CompanyBillPolicyBLL()
        {
            //ad_CompanyBillPolicyDAO = ad_CompanyBillPolicy.GetInstanceThreadSafe;
            ad_CompanyBillPolicyDAO = new ad_CompanyBillPolicyDAO();
        }

        public ad_CompanyBillPolicyDAO ad_CompanyBillPolicyDAO { get; set; }

        public List<ad_CompanyBillPolicy> GetByCompanyId(int companyId)
        {
            try
            {
                return ad_CompanyBillPolicyDAO.GetByCompanyId(companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_CompanyBillPolicy _ad_CompanyBillPolicy)
        {
            try
            {
                return ad_CompanyBillPolicyDAO.Add(_ad_CompanyBillPolicy);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}