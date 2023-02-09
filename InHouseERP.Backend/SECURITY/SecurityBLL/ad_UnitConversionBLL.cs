using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_UnitConversionBLL
    {
        public ad_UnitConversionBLL()
        {
            ad_UnitConversionDAO = new ad_UnitConversionDAO();
        }

        public ad_UnitConversionDAO ad_UnitConversionDAO { get; set; }

        public List<ad_UnitConversion> GetAll()
        {
            try
            {
                return ad_UnitConversionDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ad_UnitConversion GetById(int unitId)
        {
            try
            {
                return ad_UnitConversionDAO.GetAll(unitId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_UnitConversion ad_UnitConversion)
        {
            try
            {
                return ad_UnitConversionDAO.Add(ad_UnitConversion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_UnitConversion ad_UnitConversion)
        {
            try
            {
                return ad_UnitConversionDAO.Update(ad_UnitConversion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int unitId)
        {
            try
            {
                return ad_UnitConversionDAO.Delete(unitId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}