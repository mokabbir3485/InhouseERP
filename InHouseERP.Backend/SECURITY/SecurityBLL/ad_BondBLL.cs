using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_BondBLL
    {
        public ad_BondBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            _ad_BondDAO = new ad_BondDAO();
        }

        public ad_BondDAO _ad_BondDAO { get; set; }


        public int Post(ad_CustomBond _CustomBond)
        {
            try
            {
                return _ad_BondDAO.Post(_CustomBond);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CustomBond> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return _ad_BondDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CustomBond> GetAll(long? BondId = null)
        {
            try
            {
                return _ad_BondDAO.GetAll(BondId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CustomBond> BondDuplicate(string BondNo)
        {
            try
            {
                return _ad_BondDAO.BondDuplicate(BondNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}