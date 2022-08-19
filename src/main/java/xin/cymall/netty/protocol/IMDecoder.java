package xin.cymall.netty.protocol;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import org.msgpack.MessagePack;
import org.msgpack.MessageTypeException;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author lishuai
 * @date 2022/7/13
 * 自定义IM协议的解码器
 */
public class IMDecoder extends ByteToMessageDecoder {

	//解析IM写一下请求内容的正则
	private Pattern pattern = Pattern.compile("^\\[(.*)\\](\\s\\-\\s(.*))?");

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in,List<Object> out) throws Exception {
		try{
			//先获取可读字节数
	        final int length = in.readableBytes();
	        final byte[] array = new byte[length];
	        String content = new String(array,in.readerIndex(),length);

	        //空消息不解析
	        if(!(null == content || "".equals(content.trim()))){
	        	if(!IMP.isIMP(content)){
	        		ctx.channel().pipeline().remove(this);
	        		return;
	        	}
	        }

	        in.getBytes(in.readerIndex(), array, 0, length);
	        out.add(new MessagePack().read(array,IMMessage.class));
	        in.clear();
		}catch(MessageTypeException e){
			ctx.channel().pipeline().remove(this);
		}
	}

	/**
	 * 字符串解析成自定义即时通信协议
	 * @param msg
	 * @return
	 */
	public IMMessage decode(String msg){
		if(null == msg || "".equals(msg.trim())){ return null; }
		try{
			Matcher m = pattern.matcher(msg);
			String header = "";
			String content = "";
			if(m.matches()){
				header = m.group(1);
				content = m.group(3);
			}

			String [] heards = header.split("\\]\\[");
			long time = 0;
			try{ time = Long.parseLong(heards[1]); } catch(Exception e){}
			String username = heards[2];
			//昵称最多十个字
			username = username.length() < 10 ? username : username.substring(0, 9);

			if(msg.startsWith("[" + IMP.LOGIN.getName() + "]")){
				return new IMMessage(heards[0],time,username);
			}else if(msg.startsWith("[" + IMP.CHAT.getName() + "]")){
				String headPic = heards[3];
				return new IMMessage(heards[0],time,username,content,headPic);
			}else if(msg.startsWith("[" + IMP.FLOWER.getName() + "]")){
				return new IMMessage(heards[0],time,username);
			}else{
				return null;
			}
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
}
