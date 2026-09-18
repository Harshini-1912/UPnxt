package com.upnxt.upnxt_backend.application.dto;

import com.upnxt.upnxt_backend.application.entity.ApplicationStatus;
import lombok.Data;

@Data
public class UpdateApplicationStatusRequest {

    private ApplicationStatus status;

}