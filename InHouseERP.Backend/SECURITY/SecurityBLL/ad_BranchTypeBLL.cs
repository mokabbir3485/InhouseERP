using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_BranchTypeBLL //: IDisposible
    {
        public ad_BranchTypeBLL()
        {
            //ad_BranchTypeDAO = ad_BranchType.GetInstanceThreadSafe;
            ad_BranchTypeDAO = new ad_BranchTypeDAO();
        }

        public ad_BranchTypeDAO ad_BranchTypeDAO { get; set; }

        public List<ad_BranchType> GetAll()
        {
            try
            {
                return ad_BranchTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BranchType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_BranchTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BranchType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_BranchTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_BranchType _ad_BranchType)
        {
            try
            {
                return ad_BranchTypeDAO.Add(_ad_BranchType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_BranchType _ad_BranchType)
        {
            try
            {
                return ad_BranchTypeDAO.Update(_ad_BranchType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int BranchTypeId)
        {
            try
            {
                return ad_BranchTypeDAO.Delete(BranchTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}