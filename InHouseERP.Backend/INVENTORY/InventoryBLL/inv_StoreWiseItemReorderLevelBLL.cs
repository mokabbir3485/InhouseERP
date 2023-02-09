using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StoreWiseItemReorderLevelBLL //: IDisposible
    {
        public inv_StoreWiseItemReorderLevelBLL()
        {
            //inv_StoreWiseItemReorderLevelDAO = inv_StoreWiseItemReorderLevel.GetInstanceThreadSafe;
            inv_StoreWiseItemReorderLevelDAO = new inv_StoreWiseItemReorderLevelDAO();
        }

        public inv_StoreWiseItemReorderLevelDAO inv_StoreWiseItemReorderLevelDAO { get; set; }

        public List<inv_StoreWiseItemReorderLevel> GetAll()
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StoreWiseItemReorderLevel> Search(int DepartmentId, int? CategoryId = null,
            int? SubcategoryId = null, string ItemIds = null)
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.Search(DepartmentId, CategoryId, SubcategoryId, ItemIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StoreWiseItemReorderLevel> SearchForDashboard(int DepartmentId)
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.SearchForDashboard(DepartmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StoreWiseItemReorderLevel _inv_StoreWiseItemReorderLevel)
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.Add(_inv_StoreWiseItemReorderLevel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StoreWiseItemReorderLevel _inv_StoreWiseItemReorderLevel)
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.Update(_inv_StoreWiseItemReorderLevel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ReorderLevelId)
        {
            try
            {
                return inv_StoreWiseItemReorderLevelDAO.Delete(ReorderLevelId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}