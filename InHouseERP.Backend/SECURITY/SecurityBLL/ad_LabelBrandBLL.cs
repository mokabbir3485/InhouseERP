using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;


namespace SecurityBLL
{
    public class ad_LabelBrandBLL
    {
        public ad_LabelBrandBLL()
        {
            //ad_ItemSubCategoryDAO = ad_ItemSubCategory.GetInstanceThreadSafe;
            ad_LabelBrandDAO = new ad_LabelBrandDAO();
        }

        public ad_LabelBrandDAO ad_LabelBrandDAO { get; set; }

        public List<ad_ItemSubCategory> GetAll()
        {
            try
            {
                return ad_LabelBrandDAO.GetAll();
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
                return ad_LabelBrandDAO.GetByItemIds(itemIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_LabelBrand> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_LabelBrandDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_LabelBrand> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_LabelBrandDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(ad_LabelBrand ad_LabelBrand)
        {
            try
            {
                return ad_LabelBrandDAO.Post(ad_LabelBrand);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
