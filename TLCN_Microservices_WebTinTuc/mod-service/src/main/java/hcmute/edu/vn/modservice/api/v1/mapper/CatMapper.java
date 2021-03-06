package hcmute.edu.vn.modservice.api.v1.mapper;

import hcmute.edu.vn.modservice.api.v1.dto.CatDto;
import hcmute.edu.vn.modservice.model.Cat;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CatMapper {

    CatMapper INSTANCE = Mappers.getMapper(CatMapper.class);

    CatDto catToCatDto(Cat listcat);
}
