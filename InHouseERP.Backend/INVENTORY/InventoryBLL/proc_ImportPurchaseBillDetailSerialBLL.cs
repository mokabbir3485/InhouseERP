using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillDetailSerialBLL //: IDisposible
    {
        public proc_ImportPurchaseBillDetailSerialBLL()
        {
            //proc_ImportPurchaseBillDetailSerialDAO = proc_ImportPurchaseBillDetailSerial.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDetailSerialDAO = new proc_ImportPurchaseBillDetailSerialDAO();
        }

        public proc_ImportPurchaseBillDetailSerialDAO proc_ImportPurchaseBillDetailSerialDAO { get; set; }

        public List<proc_ImportPurchaseBillDetailSerial> GetAll()
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetBySerialAndWarrantyId(long PBDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetBySerialAndWarrantyId(PBDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetDynamic(string whereCondition, string orderByExpression)
        {
            //For Dublicate Check
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ImportPurchaseBillDetailSerial> ImportGetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.ImportGetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBillDetailSerial> LocalGetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.LocalGetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<inv_LocalPurchaseBillDetailSerial> GetHardwareWarrantyAndSerial_GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetHardwareWarrantyAndSerial_GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetAllWarrentryReport(Int64 PBDetailSerialId, Int32 ItemId, bool isLocal)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetAllWarrentryReport(PBDetailSerialId, ItemId, isLocal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.Add(_inv_PurchaseBillDetailSerial);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddForLocalPurchaseBill(inv_LocalPurchaseBillDetailSerial _inv_LocalPurchaseBillDetailSerial)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.AddForLocalPurchaseBill(_inv_LocalPurchaseBillDetailSerial);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Update(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.Update(_inv_PurchaseBillDetailSerial);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDepartment(long pBDetailSerialId, int departmentId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.UpdateDepartment(pBDetailSerialId, departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int LocalUpdateDepartment(long LPBDetailSerialId, int departmentId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.LocalUpdateDepartment(LPBDetailSerialId, departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long pBDetailSerialId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.Delete(pBDetailSerialId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateDeliveryWarrantyAndSerial(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            try
            {
                return proc_ImportPurchaseBillDetailSerialDAO.CreateDeliveryWarrantyAndSerial(_inv_PurchaseBillDetailSerial);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}