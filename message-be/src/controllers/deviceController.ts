import { ResponseApi } from "../config/response";
import { Request, Response } from "express";
import User from "../models/user";

export const addOrUpdateDevice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { deviceId, deviceName, ipAddress } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return ResponseApi(res, 404, null, "User not found");
    }

    const existingDevice = user.devices?.find((d: any) => d.deviceId === deviceId);

    if (existingDevice) {
      existingDevice.lastLogin = new Date();
      existingDevice.ipAddress = ipAddress || existingDevice.ipAddress;
    } else {
      user.devices?.push({
        deviceId,
        deviceName,
        ipAddress,
        lastLogin: new Date(),
        isSuspicious: false,
      });
    }

    await user.save();
    return ResponseApi(res, 200, user.devices, "Device updated/added successfully");
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Update device failed: ${error.message}`);
  }
};

export const getUserDeviceById = async (req: Request, res: Response) => {
  try {
    const { userId, deviceId } = req.params;

    const user = await User.findById(userId).select("devices");
    if (!user) {
      return ResponseApi(res, 404, null, "User not found");
    }

    const device = user.devices?.find((d: any) => d.deviceId === deviceId);
    if (!device) {
      return ResponseApi(res, 404, null, "Device not found");
    }

    return ResponseApi(res, 200, device, "Get device success");
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Get device failed: ${error.message}`);
  }
};

export const checkLoginDevice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { deviceId, deviceName, ipAddress } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return ResponseApi(res, 404, null, "User not found");
    }

    let device = user.devices?.find((d: any) => d.deviceId === deviceId);

    if (!device) {
      const suspiciousDevice = {
        deviceId,
        deviceName,
        ipAddress,
        lastLogin: new Date(),
        isSuspicious: true,
      };
      user.devices?.push(suspiciousDevice);
      await user.save();

      return ResponseApi(res, 403, suspiciousDevice, "Thiết bị lạ! Cần xác minh OTP");
    }

    device.lastLogin = new Date();
    device.ipAddress = ipAddress || device.ipAddress;
    device.isSuspicious = false;

    await user.save();
    return ResponseApi(res, 200, device, "Login thành công từ thiết bị quen");
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Check device failed: ${error.message}`);
  }
};

export const removeDevice = async (req: Request, res: Response) => {
  try {
    const { userId, deviceId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return ResponseApi(res, 404, null, "User not found");
    }

    user.devices = user.devices?.filter((d: any) => d.deviceId !== deviceId);
    await user.save();

    return ResponseApi(res, 200, user.devices, "Device removed successfully");
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Remove device failed: ${error.message}`);
  }
};
