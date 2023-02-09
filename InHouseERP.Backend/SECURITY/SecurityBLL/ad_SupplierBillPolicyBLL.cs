using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_SupplierBillPolicyBLL
    {
        public ad_SupplierBillPolicyBLL()
        {
            ad_SupplierBillPolicyDAO = new ad_SupplierBillPolicyDAO();
        }

        public ad_SupplierBillPolicyDAO ad_SupplierBillPolicyDAO { get; set; }

        public List<ad_SupplierBillPolicy> GetBySupplierId(int supplierId)
        {
            try
            {
                return ad_SupplierBillPolicyDAO.GetBySupplierId(supplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_SupplierBillPolicy ad_SupplierBillPolicy)
        {
            try
            {
                return ad_SupplierBillPolicyDAO.Add(ad_SupplierBillPolicy);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}