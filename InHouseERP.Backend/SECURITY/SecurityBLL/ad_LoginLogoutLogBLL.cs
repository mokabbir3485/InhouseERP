using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_LoginLogoutLogBLL //: IDisposible
    {
        public ad_LoginLogoutLogBLL()
        {
            //ad_LoginLogoutLogDAO = ad_LoginLogoutLog.GetInstanceThreadSafe;
            ad_LoginLogoutLogDAO = new ad_LoginLogoutLogDAO();
        }

        public ad_LoginLogoutLogDAO ad_LoginLogoutLogDAO { get; set; }

        public List<ad_LoginLogoutLog> GetByUserId(int userId)
        {
            try
            {
                return ad_LoginLogoutLogDAO.GetByUserId(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ad_LoginLogoutLog GetLastByUserId(int userId)
        {
            try
            {
                return ad_LoginLogoutLogDAO.GetByUserId(userId).LastOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_LoginLogoutLog ad_LoginLogoutLog)
        {
            try
            {
                return ad_LoginLogoutLogDAO.Add(ad_LoginLogoutLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateLogout(ad_LoginLogoutLog ad_LoginLogoutLog)
        {
            try
            {
                return ad_LoginLogoutLogDAO.UpdateLogout(ad_LoginLogoutLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}