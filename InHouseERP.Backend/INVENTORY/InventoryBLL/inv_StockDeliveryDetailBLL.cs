using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeliveryDetailBLL //: IDisposible
    {
        public inv_StockDeliveryDetailBLL()
        {
            //inv_StockDeliveryDetailDAO = inv_StockDeliveryDetail.GetInstanceThreadSafe;
            inv_StockDeliveryDetailDAO = new inv_StockDeliveryDetailDAO();
        }

        public inv_StockDeliveryDetailDAO inv_StockDeliveryDetailDAO { get; set; }

        public List<inv_StockDeliveryDetail> GetAll()
        {
            try
            {
                return inv_StockDeliveryDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryDetail> GetByDeliveryId(long deliveryId)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.GetByDeliveryId(deliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_StockDeliveryDetail _inv_StockDeliveryDetail)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.Add(_inv_StockDeliveryDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockDeliveryDetail _inv_StockDeliveryDetail)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.Update(_inv_StockDeliveryDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long deliveryDetailId)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.Delete(deliveryDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_DeliveryChallan> xRpt_DeliveryGetByDeliveryId(long DeliveryId)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.xRpt_DeliveryGetByDeliveryId(DeliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_ManualStockDelivery> GetManualStockDeliveryReport(Int64 DeliveryId)
        {
            try
            {
                return inv_StockDeliveryDetailDAO.GetManualStockDeliveryReport(DeliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
    }
}