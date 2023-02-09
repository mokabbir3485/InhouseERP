using System;
using System.Data;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemPriceByAttributeBLL //: IDisposible
    {
        public ad_ItemPriceByAttributeBLL()
        {
            //ad_ItemPriceDAO = ad_ItemPrice.GetInstanceThreadSafe;
            ad_ItemAttPriceDAO = new ad_ItemPriceByAttributeDAO();
        }

        public ad_ItemPriceByAttributeDAO ad_ItemAttPriceDAO { get; set; }

        public DataTable GetSinglePrice(int transactionTypeId, int priceTypeId, int itemId, int unitId)
        {
            try
            {
                return ad_ItemAttPriceDAO.GetSinglePrice(transactionTypeId, priceTypeId, itemId, unitId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemPriceByAttribute ad_ItemAttPrice)
        {
            try
            {
                return ad_ItemAttPriceDAO.Add(ad_ItemAttPrice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdatePrice(ad_ItemPriceByAttribute ad_ItemAttPrice)
        {
            try
            {
                return ad_ItemAttPriceDAO.UpdatePrice(ad_ItemAttPrice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteByItemId(int itemId)
        {
            try
            {
                return ad_ItemAttPriceDAO.DeleteByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByItemId(int itemId)
        {
            try
            {
                return ad_ItemAttPriceDAO.GetByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}