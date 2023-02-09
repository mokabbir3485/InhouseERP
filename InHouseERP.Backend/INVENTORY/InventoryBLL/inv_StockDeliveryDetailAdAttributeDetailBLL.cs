using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeliveryDetailAdAttributeDetailBLL //: IDisposible
    {
        public inv_StockDeliveryDetailAdAttributeDetailBLL()
        {
            //inv_StockDeliveryDetailAdAttributeDetailDAO = inv_StockDeliveryDetailAdAttributeDetail.GetInstanceThreadSafe;
            inv_StockDeliveryDetailAdAttributeDetailDAO = new inv_StockDeliveryDetailAdAttributeDetailDAO();
        }

        public inv_StockDeliveryDetailAdAttributeDetailDAO inv_StockDeliveryDetailAdAttributeDetailDAO { get; set; }

        public List<inv_StockDeliveryDetailAdAttributeDetail> GetByDeliveryDetailAdAttId(long deliveryDetailAdAttId)
        {
            try
            {
                return inv_StockDeliveryDetailAdAttributeDetailDAO.GetByDeliveryDetailAdAttId(deliveryDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryDetailAdAttributeDetail _inv_StockDeliveryDetailAdAttributeDetail)
        {
            try
            {
                return inv_StockDeliveryDetailAdAttributeDetailDAO.Add(_inv_StockDeliveryDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}