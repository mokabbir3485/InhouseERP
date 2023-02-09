using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemSubCategoryBLL //: IDisposible
    {
        public ad_ItemSubCategoryBLL()
        {
            //ad_ItemSubCategoryDAO = ad_ItemSubCategory.GetInstanceThreadSafe;
            ad_ItemSubCategoryDAO = new ad_ItemSubCategoryDAO();
        }

        public ad_ItemSubCategoryDAO ad_ItemSubCategoryDAO { get; set; }

        public List<ad_ItemSubCategory> GetAll()
        {
            try
            {
                return ad_ItemSubCategoryDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetByItemIds(string itemIds)
        {
            try
            {
                return ad_ItemSubCategoryDAO.GetByItemIds(itemIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ItemSubCategoryDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemSubCategoryDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemSubCategory _ad_ItemSubCategory)
        {
            try
            {
                return ad_ItemSubCategoryDAO.Add(_ad_ItemSubCategory);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemSubCategory _ad_ItemSubCategory)
        {
            try
            {
                return ad_ItemSubCategoryDAO.Update(_ad_ItemSubCategory);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int SubCategoryId)
        {
            try
            {
                return ad_ItemSubCategoryDAO.Delete(SubCategoryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}