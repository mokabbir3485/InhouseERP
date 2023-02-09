using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_CompanyTypeBLL //: IDisposible
    {
        public ad_CompanyTypeBLL()
        {
            //ad_CompanyTypeDAO = ad_CompanyType.GetInstanceThreadSafe;
            ad_CompanyTypeDAO = new ad_CompanyTypeDAO();
        }

        public ad_CompanyTypeDAO ad_CompanyTypeDAO { get; set; }

        public List<ad_CompanyType> GetAll(int? CompanyTypeId = null)
        {
            try
            {
                return ad_CompanyTypeDAO.GetAll(CompanyTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CompanyType> GetAllActive(int? CompanyTypeId = null)
        {
            try
            {
                var cusTypeLst = ad_CompanyTypeDAO.GetAll(CompanyTypeId);
                cusTypeLst = cusTypeLst.Where(t => t.IsActive).ToList();
                return cusTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CompanyType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_CompanyTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CompanyType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_CompanyTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_CompanyType _ad_CompanyType)
        {
            try
            {
                return ad_CompanyTypeDAO.Add(_ad_CompanyType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_CompanyType _ad_CompanyType)
        {
            try
            {
                return ad_CompanyTypeDAO.Update(_ad_CompanyType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int CompanyTypeId)
        {
            try
            {
                return ad_CompanyTypeDAO.Delete(CompanyTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}