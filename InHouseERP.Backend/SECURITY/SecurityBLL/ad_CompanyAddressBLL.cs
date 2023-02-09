using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityBLL
{
    public class ad_CompanyAddressBLL //: IDisposible
    {
        public ad_CompanyAddressBLL()
        {
            //ad_CompanyAddressDAO = ad_CompanyAddress.GetInstanceThreadSafe;
            ad_CompanyAddressDAO = new ad_CompanyAddressDAO();
        }

        public ad_CompanyAddressDAO ad_CompanyAddressDAO { get; set; }

        public List<ad_CompanyAddress> GetByCompanyId(int companyId)
        {
            try
            {
                return ad_CompanyAddressDAO.GetByCompanyId(companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      

        public List<ad_CompanyAddress> GetCompanyAddresses(int companyId)
        {
            try
            {
                return ad_CompanyAddressDAO.GetCompanyAddresses(companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public int Add(ad_CompanyAddress _ad_CompanyAddress)
        {
            try
            {
                return ad_CompanyAddressDAO.Add(_ad_CompanyAddress);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}