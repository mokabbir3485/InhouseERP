using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_ScreenLockBLL //: IDisposible
    {
        public s_ScreenLockBLL()
        {
            //s_ScreenLockDAO = s_ScreenLock.GetInstanceThreadSafe;
            s_ScreenLockDAO = new s_ScreenLockDAO();
        }

        public s_ScreenLockDAO s_ScreenLockDAO { get; set; }

        public List<s_ScreenLock> GetByUserAndScreen(int userId, int screenId)
        {
            try
            {
                return s_ScreenLockDAO.GetByUserAndScreen(userId, screenId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_ScreenLock s_ScreenLock)
        {
            try
            {
                return s_ScreenLockDAO.Add(s_ScreenLock);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UnLockAll(int userId)
        {
            try
            {
                return s_ScreenLockDAO.UnLockAll(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long screenLockId)
        {
            try
            {
                return s_ScreenLockDAO.Delete(screenLockId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}