using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemUnitBLL //: IDisposible
    {
        public ad_ItemUnitBLL()
        {
            //ad_ItemUnitDAO = ad_ItemUnit.GetInstanceThreadSafe;
            ad_ItemUnitDAO = new ad_ItemUnitDAO();
        }

        public ad_ItemUnitDAO ad_ItemUnitDAO { get; set; }

        public List<ad_ItemUnit> GetAll()
        {
            try
            {
                return ad_ItemUnitDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemUnit> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ItemUnitDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemUnit> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemUnitDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemUnit _ad_ItemUnit)
        {
            try
            {
                return ad_ItemUnitDAO.Add(_ad_ItemUnit);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemUnit _ad_ItemUnit)
        {
            try
            {
                return ad_ItemUnitDAO.Update(_ad_ItemUnit);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ItemUnitId)
        {
            try
            {
                return ad_ItemUnitDAO.Delete(ItemUnitId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}