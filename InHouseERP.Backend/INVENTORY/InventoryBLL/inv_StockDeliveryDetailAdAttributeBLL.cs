using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeliveryDetailAdAttributeBLL //: IDisposible
    {
        public inv_StockDeliveryDetailAdAttributeBLL()
        {
            //inv_StockDeliveryDetailAdAttributeDAO = inv_StockDeliveryDetailAdAttribute.GetInstanceThreadSafe;
            inv_StockDeliveryDetailAdAttributeDAO = new inv_StockDeliveryDetailAdAttributeDAO();
        }

        public inv_StockDeliveryDetailAdAttributeDAO inv_StockDeliveryDetailAdAttributeDAO { get; set; }

        public List<inv_StockDeliveryDetailAdAttribute> GetByDeliveryDetailId(long deliveryDetailId)
        {
            try
            {
                return inv_StockDeliveryDetailAdAttributeDAO.GetByDeliveryDetailId(deliveryDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryDetailAdAttribute _inv_StockDeliveryDetailAdAttribute)
        {
            try
            {
                return inv_StockDeliveryDetailAdAttributeDAO.Add(_inv_StockDeliveryDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}