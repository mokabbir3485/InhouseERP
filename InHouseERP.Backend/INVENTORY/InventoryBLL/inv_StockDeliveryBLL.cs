using System;
using System.Collections.Generic;
using System.Data.Common;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeliveryBLL //: IDisposible
    {
        public inv_StockDeliveryBLL()
        {
            //inv_StockDeliveryDAO = inv_StockDelivery.GetInstanceThreadSafe;
            inv_StockDeliveryDAO = new inv_StockDeliveryDAO();
        }

        public inv_StockDeliveryDAO inv_StockDeliveryDAO { get; set; }

        public List<inv_StockDelivery> GetAll(long? deliveryId = null)
        {
            try
            {
                return inv_StockDeliveryDAO.GetAll(deliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ManualStockDelivery> GetAllMnaualDelivery()
        {
            try
            {
                return inv_StockDeliveryDAO.GetAllMnaualDelivery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetStockDeliveryByCompanyId(long CompanyId)
        {
            try
            {
                return inv_StockDeliveryDAO.GetStockDeliveryByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetStockDeliveryBySalesInvoiceId(long SalesInvoiceId)
        {
            try
            {
                return inv_StockDeliveryDAO.GetStockDeliveryBySalesInvoiceId(SalesInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_ManualStockDeliveryDetail> GetByManualDeliveryId(Int64 manualDeliveryId)
        {
            try
            {
                return inv_StockDeliveryDAO.GetByManualDeliveryId(manualDeliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_DeliveryHistory> GetByDeliveryHistory(DateTime FormDate,DateTime ToDate)
        {
            try
            {
                return inv_StockDeliveryDAO.GetByDeliveryHistory(FormDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public List<inv_ManualStockDelivery> CheckDuplicateManualDeliveryNo(string manualDeliveryNo)
        {
            try
            {
                return inv_StockDeliveryDAO.CheckDuplicateManualDeliveryNo(manualDeliveryNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockDeliveryDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDelivery> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeliveryDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_ManualStockDelivery> GetManualStockPaged(int startRecordNo, int rowPerPage, string whereClause,
           string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeliveryDAO.GetManualStockPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Add(inv_StockDelivery _inv_StockDelivery)
        {
            try
            {
                return inv_StockDeliveryDAO.Add(_inv_StockDelivery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ManualStockDeliveryAdd(inv_ManualStockDelivery _ManualStockDelivery)
        {
            try
            {
                return inv_StockDeliveryDAO.ManualStockDeliveryAdd(_ManualStockDelivery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ManualStockDeliveryDetailAdd(inv_ManualStockDeliveryDetail _ManualStockDeliveryDetail)
        {
            try
            {
                return inv_StockDeliveryDAO.ManualStockDeliveryDetailAdd(_ManualStockDeliveryDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Update(inv_StockDelivery _inv_StockDelivery)
        {
            try
            {
                return inv_StockDeliveryDAO.Update(_inv_StockDelivery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_StockDelivery _inv_StockDelivery)
        {
            try
            {
                return inv_StockDeliveryDAO.UpdateApprove(_inv_StockDelivery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public int Delete(long deliveryId)
        {
            try
            {
                return inv_StockDeliveryDAO.Delete(deliveryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int ManualDeliveryUpDelete(long manualDeliveryDetailId)
        {
            try
            {
                return inv_StockDeliveryDAO.ManualDeliveryUpDelete(manualDeliveryDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long GetMaxDeliveryNo(DateTime deliveryDate)
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxDeliveryNo(deliveryDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxDeliveryId()
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxDeliveryId();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxDeliveryNumber()
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxDeliveryNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxOrderNumber()
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxOrderNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxStockDeliverySLNumber()
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxStockDeliverySLNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxManualStockDeliverySLNumber()
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxManualStockDeliverySLNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        

        public string GetMaxStockDeliveryOrderNumber(DateTime deliveryDate)
        {
            try
            {
                return inv_StockDeliveryDAO.GetMaxStockDeliveryOrderNumber(deliveryDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}