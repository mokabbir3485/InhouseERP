using System;
using System.Collections.Generic;
using System.Data;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemPriceBLL //: IDisposible
    {
        public ad_ItemPriceBLL()
        {
            //ad_ItemPriceDAO = ad_ItemPrice.GetInstanceThreadSafe;
            ad_ItemPriceDAO = new ad_ItemPriceDAO();
        }

        public ad_ItemPriceDAO ad_ItemPriceDAO { get; set; }

        public List<ad_ItemPrice> GetByItemId(int itemId)
        {
            try
            {
                return ad_ItemPriceDAO.GetByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSinglePrice(int transactionTypeId, int priceTypeId, long itemAddAttId, int unitId)
        {
            try
            {
                return ad_ItemPriceDAO.GetSinglePrice(transactionTypeId, priceTypeId, itemAddAttId, unitId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemPrice ad_ItemPrice)
        {
            try
            {
                return ad_ItemPriceDAO.Add(ad_ItemPrice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemPrice ad_ItemPrice)
        {
            try
            {
                return ad_ItemPriceDAO.Update(ad_ItemPrice);
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
                return ad_ItemPriceDAO.DeleteByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}