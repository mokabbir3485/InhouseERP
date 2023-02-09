using System;
using System.Collections.Generic;
using System.Data.Common;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockTransferBLL
    {
        public inv_StockTransferBLL()
        {
            inv_StockTransferDAO = new inv_StockTransferDAO();
        }

        public inv_StockTransferDAO inv_StockTransferDAO { get; set; }

        public List<inv_StockTransfer> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockTransferDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockTransfer> GetAllStockTransferType()
        {
            try
            {
                return inv_StockTransferDAO.GetAllStockTransferType();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockTransfer> Get()
        {
            try
            {
                return inv_StockTransferDAO.Get();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long StockTransferDetailPost(inv_StockTransferDetail _inv_StockTransferDetail)
        {
            try
            {
                return inv_StockTransferDAO.StockTransferDetailPost(_inv_StockTransferDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long UpdateHardwareTransferWarrantyAndSerial(inv_TransferSerialDetail inv_TransferSerialDetail)
        {
            try
            {
                return inv_StockTransferDAO.UpdateHardwareTransferWarrantyAndSerial(inv_TransferSerialDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Post(inv_StockTransfer _inv_StockTransfer)
        {
            try
            {
                return inv_StockTransferDAO.Post(_inv_StockTransfer);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public DbDataReader GetMaxStockTransferNo()
        //{
        //    try
        //    {
        //        return inv_StockTransferDAO.GetMaxStockTransferNo();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        
        public List<xrpt_inv_Report> GetMaterialReturnAndISTMForReport(long StockTransferId, int StockTransferTypeId)
        {
            try
            {
                return inv_StockTransferDAO.GetMaterialReturnAndISTMForReport(StockTransferId, StockTransferTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_Report> StoreAndItemTransferReport(long StockTransferId, int StockTransferTypeId)
        {
            try
            {
                return inv_StockTransferDAO.StoreAndItemTransferReport(StockTransferId, StockTransferTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_Report> StockTransferLog(DateTime FromDate, DateTime ToDate,int DepartmentId, int ? StockTransferTypeId=null, int? ItemId = null, int? MaterialTypeId = null)
        {
            try
            {
                return inv_StockTransferDAO.StockTransferLog(FromDate, ToDate,DepartmentId, StockTransferTypeId, ItemId, MaterialTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public long GetMaxStockTransferNo()
        {
            try
            {
                return inv_StockTransferDAO.GetMaxStockTransferNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}