using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityBLL
{
    public class ad_CompanyBLL //: IDisposible
    {
        public ad_CompanyBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            ad_CompanyDAO = new ad_CompanyDAO();
        }

        public ad_CompanyDAO ad_CompanyDAO { get; set; }

        public List<ad_Company> GetCompanyIdByDetail(string companyName, string contactPerson, string contactNo,
            string email)
        {
            try
            {
                return ad_CompanyDAO.GetCompanyIdByDetail(companyName, contactPerson, contactNo, email);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public List<ad_CompanyAddress> GetCompanyBillDeliveryAddressByCompanyId(Int32 CompanyId)
        {
            try
            {
                return ad_CompanyDAO.GetCompanyBillDeliveryAddressByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public List<ad_Company> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_CompanyDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Organization> GetAllOrgnazition()
        {
            try
            {
                return ad_CompanyDAO.GetAllOrgnazition();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_Company> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_CompanyDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Company _ad_Company)
        {
            try
            {
                return ad_CompanyDAO.Add(_ad_Company);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int CompanyWiseSupplierPost(ad_Company _ad_Company)
        {
            try
            {
                return ad_CompanyDAO.CompanyWiseSupplierPost(_ad_Company);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Company _ad_Company)
        {
            try
            {
                return ad_CompanyDAO.Update(_ad_Company);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int companyId)
        {
            try
            {
                return ad_CompanyDAO.Delete(companyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}