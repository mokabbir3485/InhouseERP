using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockOpeningQuantityBLL //: IDisposible
    {
        public inv_StockOpeningQuantityBLL()
        {
            //inv_StockOpeningQuantityDAO = inv_StockOpeningQuantity.GetInstanceThreadSafe;
            inv_StockOpeningQuantityDAO = new inv_StockOpeningQuantityDAO();
        }

        public inv_StockOpeningQuantityDAO inv_StockOpeningQuantityDAO { get; set; }

        public List<inv_StockOpeningQuantity> GetAll()
        {
            try
            {
                return inv_StockOpeningQuantityDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockOpeningQuantity> Search(int ItemId, int DepartmentId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.Search(ItemId, DepartmentId, MaterialTypeId, LabelBrandId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<OpeningWarrentyAndSerialNoList> HardwareOpeningStockWarrantyAndSerialGetByStockOpeningQtyId(long StockOpeningQtyId)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.HardwareOpeningStockWarrantyAndSerialGetByStockOpeningQtyId(StockOpeningQtyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(inv_StockOpeningQuantity _inv_OpeningQuantity)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.Post(_inv_OpeningQuantity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int CreateWarrentyAndSerialNo(OpeningWarrentyAndSerialNoList WarrentyAndSerialNoList)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.CreateWarrentyAndSerialNo(WarrentyAndSerialNoList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int Update(inv_StockOpeningQuantity _inv_OpeningQuantity)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(_inv_OpeningQuantity.OpeningPackageName))
        //            _inv_OpeningQuantity.OpeningPackageName = "";
        //        if (string.IsNullOrEmpty(_inv_OpeningQuantity.OpeningContainerName))
        //            _inv_OpeningQuantity.OpeningContainerName = "";
        //        return inv_StockOpeningQuantityDAO.Update(_inv_OpeningQuantity);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public int Delete(long OpeningQtyId)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.Delete(OpeningQtyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Inv_HardwareWarrantyAndSerial> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockOpeningQuantity> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockOpeningQuantityDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}