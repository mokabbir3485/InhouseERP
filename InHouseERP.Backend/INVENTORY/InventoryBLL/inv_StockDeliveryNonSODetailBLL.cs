using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeliveryNonSODetailBLL //: IDisposible
    {
        public inv_StockDeliveryNonSODetailBLL()
        {
            //inv_StockDeliveryNonSODetailDAO = inv_StockDeliveryNonSODetail.GetInstanceThreadSafe;
            inv_StockDeliveryNonSODetailDAO = new inv_StockDeliveryNonSODetailDAO();
        }

        public inv_StockDeliveryNonSODetailDAO inv_StockDeliveryNonSODetailDAO { get; set; }

        public List<inv_StockDeliveryNonSODetail> GetAll()
        {
            try
            {
                return inv_StockDeliveryNonSODetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSODetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockDeliveryNonSODetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSODetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeliveryNonSODetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryNonSODetail _inv_StockDeliveryNonSODetail)
        {
            try
            {
                return inv_StockDeliveryNonSODetailDAO.Add(_inv_StockDeliveryNonSODetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockDeliveryNonSODetail _inv_StockDeliveryNonSODetail)
        {
            try
            {
                return inv_StockDeliveryNonSODetailDAO.Update(_inv_StockDeliveryNonSODetail);
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
                return inv_StockDeliveryNonSODetailDAO.Delete(deliveryDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}