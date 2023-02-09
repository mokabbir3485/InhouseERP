using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemCategoryBLL //: IDisposible
    {
        public ad_ItemCategoryBLL()
        {
            //ad_ItemCategoryDAO = ad_ItemCategory.GetInstanceThreadSafe;
            ad_ItemCategoryDAO = new ad_ItemCategoryDAO();
        }

        public ad_ItemCategoryDAO ad_ItemCategoryDAO { get; set; }

        public List<ad_ItemCategory> GetAll()
        {
            try
            {
                return ad_ItemCategoryDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemCategory> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ItemCategoryDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemCategory> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemCategoryDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemCategory _ad_ItemCategory)
        {
            try
            {
                return ad_ItemCategoryDAO.Add(_ad_ItemCategory);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemCategory _ad_ItemCategory)
        {
            try
            {
                return ad_ItemCategoryDAO.Update(_ad_ItemCategory);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int CategoryId)
        {
            try
            {
                return ad_ItemCategoryDAO.Delete(CategoryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}