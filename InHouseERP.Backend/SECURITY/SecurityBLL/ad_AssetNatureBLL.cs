using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_AssetNatureBLL //: IDisposible
    {
        public ad_AssetNatureBLL()
        {
            //ad_AssetNatureDAO = ad_AssetNature.GetInstanceThreadSafe;
            ad_AssetNatureDAO = new ad_AssetNatureDAO();
        }

        public ad_AssetNatureDAO ad_AssetNatureDAO { get; set; }

        public List<ad_AssetNature> GetAll()
        {
            try
            {
                return ad_AssetNatureDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AssetNature ad_AssetNature)
        {
            try
            {
                return ad_AssetNatureDAO.Add(ad_AssetNature);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_AssetNature ad_AssetNature)
        {
            try
            {
                return ad_AssetNatureDAO.Update(ad_AssetNature);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int assetNatureId)
        {
            try
            {
                return ad_AssetNatureDAO.Delete(assetNatureId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}