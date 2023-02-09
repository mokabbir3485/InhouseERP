using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnToSupplierBLL //: IDisposible
    {
        public inv_ReturnToSupplierBLL()
        {
            //inv_ReturnToSupplierDAO = inv_ReturnToSupplier.GetInstanceThreadSafe;
            inv_ReturnToSupplierDAO = new inv_ReturnToSupplierDAO();
        }

        public inv_ReturnToSupplierDAO inv_ReturnToSupplierDAO { get; set; }

        public List<inv_ReturnToSupplier> GetAll(long? returnId = null)
        {
            try
            {
                return inv_ReturnToSupplierDAO.GetAll(returnId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            try
            {
                return inv_ReturnToSupplierDAO.Add(_inv_ReturnToSupplier);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            try
            {
                return inv_ReturnToSupplierDAO.Update(_inv_ReturnToSupplier);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            try
            {
                return inv_ReturnToSupplierDAO.UpdateApprove(_inv_ReturnToSupplier);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}