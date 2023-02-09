using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using SecurityDAL;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemBLL //: IDisposible
    {
        public ad_ItemBLL()
        {
            //ad_ItemDAO = ad_Item.GetInstanceThreadSafe;
            ad_ItemDAO = new ad_ItemDAO();
        }

        public ad_ItemDAO ad_ItemDAO { get; set; }

        public List<exp_RibbonInPerLabelCarton> GetAllSPCase()
        {
            try
            {
                return ad_ItemDAO.GetAllSPCase();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_ItemCurrentStock> GetByMatrialIdWithCurrentStock(Int32 matrialTypeId, Int32 departmentid)
        {
            try
            {
                return ad_ItemDAO.GetByMatrialIdWithCurrentStock(matrialTypeId, departmentid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetAll()
        {
            try
            {
                return ad_ItemDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetByTopItem(int itemid)
        {
            try
            {
                return ad_ItemDAO.GetByTopItem(itemid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_Item> GetCompanyWiseItemForSO(int CompanyId, int itemId)
        {
            try
            {
                return ad_ItemDAO.GetCompanyWiseItemForSO(itemId, CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemVat> GetItemVatById(long ItemId)
        {
            try
            {
                return ad_ItemDAO.GetItemVatById(ItemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_Item> GetItemStatusDetailByItemId(long ItemId)
        {
            try
            {
                return ad_ItemDAO.GetItemStatusDetailByItemId(ItemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_Item> GetRibbonInPerLabelCarton_GetAllLabel(int? RibbonId = null)
        {
            try
            {
                return ad_ItemDAO.GetRibbonInPerLabelCarton_GetAllLabel(RibbonId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetLimitedProperty()
        {
            try
            {
                return ad_ItemDAO.GetLimitedProperty();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetLimitedPropertyWithAttribute(int departmentId)
        {
            try
            {
                return ad_ItemDAO.GetLimitedPropertyWithAttribute(departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ad_Item GetItemForSo()
        {
            try
            {
                return ad_ItemDAO.GetItemForSo().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ad_Item GetByItemId(int ItemId)
        {
            try
            {
                return ad_ItemDAO.GetAll(ItemId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetRaw()
        {
            try
            {
                return ad_ItemDAO.GetRaw();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetRawWithoutSelectedItem(int itemId)
        {
            try
            {
                return ad_ItemDAO.GetRawWithoutSelectedItem(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ItemDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(ad_Item ad_Item)
        {
            try
            {
                return ad_ItemDAO.Post(ad_Item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int PostSpecialItem(ad_Item ad_ItemSpecialItem)
        {
            try
            {
                return ad_ItemDAO.PostSpecialItem(ad_ItemSpecialItem);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ad_ItemVat_Add(ad_ItemVat ad_ItemVat)
        {
            try
            {
                return ad_ItemDAO.ad_ItemVat_Add(ad_ItemVat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ad_ItemVat_Update(ad_ItemVat ad_ItemVat)
        {
            try
            {
                return ad_ItemDAO.ad_ItemVat_Update(ad_ItemVat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int Update(ad_Item ad_Item)
        //{
        //    try
        //    {
        //        return ad_ItemDAO.Update(ad_Item);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public int Delete(int itemId)
        {
            try
            {
                return ad_ItemDAO.Delete(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeleteRibbonInPerLabelById(long Id)
        {
            try
            {
                return ad_ItemDAO.DeleteRibbonInPerLabelById(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetNBarcode(int qty)
        {
            try
            {
                return ad_ItemDAO.GetNBarcode(qty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetRawMaterialAndCombination()
        {
            try
            {
                return ad_ItemDAO.GetRawMaterialAndCombination();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCombinationWithPrice()
        {
            try
            {
                return ad_ItemDAO.GetCombinationWithPrice();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCombinationByRequisitionId(long requisitionId)
        {
            try
            {
                return ad_ItemDAO.GetCombinationByRequisitionId(requisitionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Item> GetPagedItemStatus(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemDAO.GetPagedItemStatus(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}