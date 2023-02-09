using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockAdjustmentBLL
    {
        public inv_StockAdjustmentBLL()
        {
            //inv_StockAdjustmentDAO = inv_StockAdjustment.GetInstanceThreadSafe;
            inv_StockAdjustmentDAO = new inv_StockAdjustmentDAO();
        }

        public inv_StockAdjustmentDAO inv_StockAdjustmentDAO { get; set; }

        public List<inv_StockAdjustment> GetAll()
        {
            try
            {
                return inv_StockAdjustmentDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAdjustmentReason> StockAdjustmentReason()
        {
            try
            {
                return inv_StockAdjustmentDAO.StockAdjustmentReason();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<inv_StockAdjustment> SearchCurrentQuantity(int ItemId, int DepartmentId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {
                return inv_StockAdjustmentDAO.SearchCurrentQuantity(ItemId, DepartmentId, MaterialTypeId, LabelBrandId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(inv_StockAdjustment _inv_OpeningQuantityAdjustment)
        {
            try
            {
                return inv_StockAdjustmentDAO.Create(_inv_OpeningQuantityAdjustment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateWarrentyAndSerialNo(AdjustmentWarrentyAndSerialNoList WarrentyAndSerialNoList)
        {
            try
            {
                return inv_StockAdjustmentDAO.CreateWarrentyAndSerialNo(WarrentyAndSerialNoList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockAdjustmentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
