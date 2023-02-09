using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemUnitPackageBLL //: IDisposible
    {
        public ad_ItemUnitPackageBLL()
        {
            //ad_ItemUnitPackageDAO = ad_ItemUnitPackage.GetInstanceThreadSafe;
            ad_ItemUnitPackageDAO = new ad_ItemUnitPackageDAO();
        }

        public ad_ItemUnitPackageDAO ad_ItemUnitPackageDAO { get; set; }

        public List<ad_ItemUnitPackage> GetAll()
        {
            try
            {
                return ad_ItemUnitPackageDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemUnitPackage ad_ItemUnitPackage)
        {
            try
            {
                return ad_ItemUnitPackageDAO.Add(ad_ItemUnitPackage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemUnitPackage ad_ItemUnitPackage)
        {
            try
            {
                return ad_ItemUnitPackageDAO.Update(ad_ItemUnitPackage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int packageId)
        {
            try
            {
                return ad_ItemUnitPackageDAO.Delete(packageId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}