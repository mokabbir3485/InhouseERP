using System;
using System.Collections.Generic;
using System.Data;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_AdvancedSearchPropertyBLL //: IDisposible
    {
        public ad_AdvancedSearchPropertyBLL()
        {
            //ad_AdvancedSearchPropertyDAO = ad_AdvancedSearchProperty.GetInstanceThreadSafe;
            ad_AdvancedSearchPropertyDAO = new ad_AdvancedSearchPropertyDAO();
        }

        public ad_AdvancedSearchPropertyDAO ad_AdvancedSearchPropertyDAO { get; set; }

        public List<ad_AdvancedSearchProperty> GetByTableName(string tableName)
        {
            try
            {
                var ad_AdvancedSearchPropertyLst = new List<ad_AdvancedSearchProperty>();
                ad_AdvancedSearchPropertyLst = ad_AdvancedSearchPropertyDAO.GetByTableName(tableName);

                //if (tableName == "ad_Item")
                //{
                //    ad_AdvancedSearchPropertyLst = new List<ad_AdvancedSearchProperty>();
                //    string[] addProperties = { "Product Name", "Product Code", "Category Name", "Subcategory Name", "Account Code" };
                //    ad_AdvancedSearchPropertyLst = AddToList(ad_AdvancedSearchPropertyLst, addProperties);
                //}

                return ad_AdvancedSearchPropertyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdvancedSearchProperty> GetColumnNames(int screenId)
        {
            try
            {
                var ad_AdvancedSearchPropertyLst = new List<ad_AdvancedSearchProperty>();
                ad_AdvancedSearchPropertyLst = ad_AdvancedSearchPropertyDAO.GetColumnNames(screenId);

                //if (tableName == "ad_Item")
                //{
                //    ad_AdvancedSearchPropertyLst = new List<ad_AdvancedSearchProperty>();
                //    string[] addProperties = { "Product Name", "Product Code", "Category Name", "Subcategory Name", "Account Code" };
                //    ad_AdvancedSearchPropertyLst = AddToList(ad_AdvancedSearchPropertyLst, addProperties);
                //}

                return ad_AdvancedSearchPropertyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable Search(string tableName, string whereCondition)
        {
            try
            {
                var dt = ad_AdvancedSearchPropertyDAO.Search(tableName, whereCondition);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable SearchByScreenId(int screenId, int fromScreenId, string whereCondition)
        {
            try
            {
                var dt = ad_AdvancedSearchPropertyDAO.SearchByScreenId(screenId, fromScreenId, whereCondition);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetDetail(int screenId, string pkId)
        {
            try
            {
                var dt = ad_AdvancedSearchPropertyDAO.GetDetail(screenId, pkId);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetLastPunch(string branchName)
        {
            try
            {
                return ad_AdvancedSearchPropertyDAO.GetLastPunch(branchName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //private List<ad_AdvancedSearchProperty> AddToList(List<ad_AdvancedSearchProperty> lstAddTo, string[] properties)
        //{
        //    for (int i = 0; i < properties.Length; i++)
        //    {
        //        lstAddTo.Add(new ad_AdvancedSearchProperty(properties[i]));
        //    }

        //    return lstAddTo;
        //}

        //private List<ad_AdvancedSearchProperty> RemoveFromList(List<ad_AdvancedSearchProperty> lstRemoveFrom, string[] properties)
        //{
        //    for (int i = 0; i < properties.Length; i++)
        //    {
        //        lstRemoveFrom.Remove(new ad_AdvancedSearchProperty(properties[i]));
        //    }

        //    return lstRemoveFrom;
        //}
    }
}