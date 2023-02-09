using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemSubCategoryTypeBLL //: IDisposible
    {
        public ad_ItemSubCategoryTypeBLL()
        {
            //ad_ItemSubCategoryTypeDAO = ad_ItemSubCategoryType.GetInstanceThreadSafe;
            ad_ItemSubCategoryTypeDAO = new ad_ItemSubCategoryTypeDAO();
        }

        public ad_ItemSubCategoryTypeDAO ad_ItemSubCategoryTypeDAO { get; set; }

        public List<ad_ItemSubCategoryType> GetAll()
        {
            try
            {
                return ad_ItemSubCategoryTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemSubCategoryType ad_ItemSubCategoryType)
        {
            try
            {
                return ad_ItemSubCategoryTypeDAO.Add(ad_ItemSubCategoryType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemSubCategoryType ad_ItemSubCategoryType)
        {
            try
            {
                return ad_ItemSubCategoryTypeDAO.Update(ad_ItemSubCategoryType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int subCategoryTypeId)
        {
            try
            {
                return ad_ItemSubCategoryTypeDAO.Delete(subCategoryTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}